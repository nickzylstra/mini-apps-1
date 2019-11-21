/* eslint-disable no-console */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(({ connection }) => {
    const {
      host, name, user, port,
    } = connection;
    console.log(`mongoose connnected to '${host}/${name}:${port}' as '${user}'`);
  }, (err) => {
    console.log(`mongoose failed to connect, \n ${err}`);
  });

const Order = new Schema({
  userId: ObjectId,
  name: String,
  email: String,
  // TODO - hash password
  password: String,
});

const Model = mongoose.model('Order', Order);
debugger;
