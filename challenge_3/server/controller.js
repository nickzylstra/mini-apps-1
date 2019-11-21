/* eslint-disable no-console */
const Order = require('./model');

module.exports.post = (data, next) => {
  if (!data) {
    const order = new Order();
    order.save((err, newOrder) => {
      if (err) {
        console.log(err);
        next(err, null);
      } else {
        next(null, newOrder.id);
      }
    });
  } else {
    const {
      id, name, email, password,
    } = data;

    Order.find({ _id: id }, (err, [order]) => {
      if (err) {
        next(err);
      }
      order.name = name;
      order.email = email;
      order.password = password;
      order.save((err, newOrder) => {
        if (err) {
          console.log(err);
          next(err, null);
        } else {
          next(null, newOrder.id);
        }
      });
    });
  }
};
