const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  status: { 
  type: String, 
  enum: ['pending', 'preparing', 'out for delivery', 'delivered'], default: 'pending' },
  totalPrice: Number,
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
