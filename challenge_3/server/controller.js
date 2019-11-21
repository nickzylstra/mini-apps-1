/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const Order = require('./model');

const updateOrder = (order, next) => {
  order.save()
    .then((newOrder) => {
      next(null, newOrder.id);
    }, (err) => {
      console.log(err);
      next(err, null);
    });
};

module.exports.post = (data, next) => {
  if (!data) {
    const order = new Order();
    updateOrder(order, next);
  } else {
    const {
      id, name, email, password,
    } = data;

    Order.find({ _id: id })
      .then(([order]) => {
        order.name = name;
        order.email = email;
        order.password = password;
        updateOrder(order, next);
      }, (err) => {
        next(err);
      });
  }
};
