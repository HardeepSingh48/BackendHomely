const express = require('express');
const FoodItem = require('../models/FoodItem');
const verifyToken = require('../middleware/verifyToken'); // Import the new middleware

const router = express.Router();

// Get all food items
router.get('/', async (req, res) => {
  const foodItems = await FoodItem.find().populate('restaurantId').populate('categoryId');
  res.json(foodItems);
});

// Add a new food item (Only seller can add)
router.post('/', verifyToken, async (req, res) => { // Use verifyToken middleware
  if (req.user.role !== 'seller') return res.status(403).json({ message: 'Access Denied' });
  const newFood = new FoodItem(req.body);
  await newFood.save();
  res.status(201).json({ message: 'Food item created successfully', foodItem: newFood });
});
module.exports = router;
