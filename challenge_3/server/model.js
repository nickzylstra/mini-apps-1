/* eslint-disable no-console */
const mongoose = require('mongoose');

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
