const express = require('express');
const FoodItem = require('../models/FoodItem');
const Category = require('../models/Category');
const verifyToken = require('../middleware/verifyToken'); // Import the new middleware

const router = express.Router();

// Get all food items
router.get('/', async (req, res) => {
  const foodItems = await FoodItem.find().select('name price isAvailable quantity createdAt restaurantId categoryId');
  
  // Format the response to include only the IDs for restaurantId and categoryId
  const formattedFoodItems = foodItems.map(item => ({
    _id: item._id,
    name: item.name,
    price: item.price,
    isAvailable: item.isAvailable,
    quantity: item.quantity,
    createdAt: item.createdAt,
    restaurantId: item.restaurantId, // This will be the ID of the restaurant
    categoryId: item.categoryId // This will be the ID of the category
  }));

  res.json(formattedFoodItems);
});

// Add a new food item (Only seller can add)
router.post('/', verifyToken, async (req, res) => { // Use verifyToken middleware
  if (req.user.role !== 'seller') return res.status(403).json({ message: 'Access Denied' });
  const newFood = new FoodItem({
      ...req.body,
      restaurantId: req.user.id // Automatically set the restaurantId
  });
  await newFood.save();
  res.status(201).json({ message: 'Food item created successfully', foodItem: newFood });
});
module.exports = router;
