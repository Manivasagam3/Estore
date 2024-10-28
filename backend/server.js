// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const { ProductModel, LoginModel,CartItem } = require("./models");
const connectDB = require("./db");


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
        const { name, category, price } = req.body;

        // Ensure all required fields are present
        if (!name || !category || !price) {
            return res.status(400).send("Missing required fields");
        }

        // Convert the image buffer to a Base64 string
        const imageBase64 = req.file.buffer.toString('base64');

        const newProduct = new ProductModel({
            name,
            category,
            price,
            image: imageBase64
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


// Listen on port
app.listen(PORT, () => {
    console.log(`The port is running on ${PORT}`);
});
