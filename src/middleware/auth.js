const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Seller = require('../models/Seller');

const router = express.Router();

router.post('/register/customer', async (req,res) => {
    const customer = new Customer(req.body);
    await customer.save();
    res,status(201).json({message: 'Customer created successfully'});
});

router.post('/register/seller', async (req,res) => {
    const seller = new Seller(req.body);
    await seller.save();;
    res.status(201).json({message: 'Seller created successfully'});
});

router.post('/login',async (req,res) => {
    const{email,password,role} = req.body;
    const Model = role === 'seller' ? Seller : Customer;
    const user = await Model.findOne({email});

    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(401).json({message: 'Invalid credentials'});

    }

    const token = jwt.sign({id: user._id,role}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.json({token});
});

module.exports = router;