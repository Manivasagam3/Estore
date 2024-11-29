// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const { ProductModel, LoginModel,CartItem,PurchaseItem} = require("./models");
const connectDB = require("./db");
const stripe = require("stripe")("enter your key");


const PORT = 8000;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Connect
connectDB();

// Handle image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST to /products
app.post("/products", upload.single('image'), async (req, res) => {
    try {
        const { name, category, price,description } = req.body;

        // Ensure all required fields are present
        if (!name || !category || !price || !description) {
            return res.status(400).send("Missing required fields");
        }

        // Convert the image buffer to a Base64 string
        const imageBase64 = req.file.buffer.toString('base64');

        const newProduct = new ProductModel({
            name,
            category,
            price,
            image: imageBase64,
            description
        });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

// GET from /products
app.get("/products", async (req, res) => {
    try {
        const items = await ProductModel.find();
        res.status(200).json(items);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});
app.get("/signup",async(req,res)=>{
    try{
        const data=await LoginModel.find();
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).send("server error");
    }
})

// POST to /signup
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new LoginModel({ username, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});
//login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await LoginModel.findOne({ username: username });
        if (user) {
            if (user.password === password) {
                res.json("success");
            } else {
                res.json("password incorrect");
            }
        } else {
            res.json("No user found");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json("Internal server error");
    }
});
app.delete("/signup/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await LoginModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

//mens
app.get("/men",async(req,res)=>{
    try{
        const data=await ProductModel.find({category:"men"});
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).send("server error");
    }
})

//female
app.get("/women",async(req,res)=>{
    try{
        const data=await ProductModel.find({category:"female"});
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).send("server error");
    }
})

//kids
app.get("/kid",async(req,res)=>{
    try{
        const data=await ProductModel.find({category:"kids"});
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).send("server error");
    }
})

////////////////Cart functionality//////////////
app.post('/cart', async (req, res) => {
    const { name, price, quantity } = req.body;
    try {
      const existingItem = await CartItem.findOne({ name });
      if (existingItem) {
        existingItem.quantity += quantity;
        await existingItem.save();
      } else {
        const newItem = new CartItem({ name, price, quantity });
        await newItem.save();
      }
      res.status(200).json({ message: 'Item added to cart' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Fetch all cart items
app.get('/cart', async (req, res) => {
    try {
      const cartItems = await CartItem.find();
      res.status(200).json(cartItems);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Remove an item from the cart
app.delete('/cart/:name', async (req, res) => {
    const { name } = req.params;
    try {
      await CartItem.findOneAndDelete({ name });
      res.status(200).json({ message: 'Item removed from cart' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Clear the entire cart
  app.delete('/cart', async (req, res) => {
    try {
      await CartItem.deleteMany();
      res.status(200).json({ message: 'Cart cleared' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
//productpage
app.get('/products/:id', async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) return res.status(404).send("Product not found");
      res.json(product);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  //payment gateway///
  app.post("/create-checkout-session", async (req, res) => {
    const { productName, productPrice } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: productName,
              },
              unit_amount: productPrice * 100, // Amount in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success?status=success",
cancel_url: "http://localhost:3000/cancel",
      });
  
      res.json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  //save-purchase//
  app.post("/save-purchase", async (req, res) => {
    try {
    const { name, email, address, productName, productPrice, status } = req.body;

    // Log request body for debugging
    console.log("Received purchase data:", req.body);

    if (!name || !email || !address || !productName || productPrice == null || !status) {
        return res.status(400).json({ error: "All fields are required." });
    }


        const newPurchase = new PurchaseItem({
            name,
            email,
            address,
            productName,
            productPrice,
            status,
        });

        // Log the data before saving
        console.log("Saving to database:", newPurchase);

        await newPurchase.save();
        res.status(200).json({ message: "Purchase data saved successfully!" });

        // Log success message
        console.log("Purchase saved successfully.");
    } catch (error) {
        console.error("Error saving purchase data:", error);
        res.status(500).json({ error: "Error saving purchase data." });
    }
});

// Listen on port
app.listen(PORT, () => {
    console.log(`The port is running on ${PORT}`);
});
