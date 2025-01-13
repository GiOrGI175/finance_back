const express = require('express');
const connectToDb = require('./db/connectToMondoDb');

const app = express();
app.use(express.json());

connectToDb();

// app.use('');

// app.get('/', (req, res) => {
//   res.send('hi');
// });

app.listen(3001, () => {
  console.log('running on: http://localhost:3001 ');
});
