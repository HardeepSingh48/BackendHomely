const express = require('express');
const FoodItem = require('../models/FoodItem');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all food items
router.get('/', async (req, res) => {
  const foodItems = await FoodItem.find().populate('restaurantId').populate('categoryId');
  res.json(foodItems);
});

// Add a new food item (Only seller can add)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'seller') return res.status(403).json({ message: 'Access Denied' });
  const newFood = new FoodItem(req.body);
  await newFood.save();
  res.status(201).json(newFood);
});

module.exports = router;
