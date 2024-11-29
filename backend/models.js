// models.js

const mongoose = require("mongoose");

// Product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description:{type:String,required:true}
});

const ProductModel = mongoose.model("Productitem", productSchema);

// Login schema
const loginSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model("Signup", loginSchema);
//cart
const cartItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
  });
  
  const CartItem = mongoose.model('CartItem', cartItemSchema);
  
  const purchaseSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    address: { type: String},
    productName: { type: String},
    productPrice: { type: Number},
    status: { type: String},
  }, { timestamps: true }); // Add timestamps for createdAt and updatedAt
  
  const PurchaseItem = mongoose.model("Purchase", purchaseSchema);
  
module.exports = {
    ProductModel,
    LoginModel,
    CartItem,
    PurchaseItem
};
