/* eslint-disable no-console */
const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error'));
db.once('open', () => console.log('mongoose connected'));

const orderSchema = new Schema({
  name: String,
  email: String,
  // TODO - hash password
  password: String,
});

const Order = mongoose.model('Order', orderSchema);
// const instance = new Model();
module.exports = Order;
