const express = require('express');
const cors = require('cors');
const connectToDb = require('./db/connectToMondoDb');
const usersRouter = require('./routes/users/users.router');
const potsRouter = require('./routes/pots/pots.router');

const app = express();
app.use(express.json());
app.use(cors());

connectToDb();

app.use('/users', usersRouter);
app.use('/pots', potsRouter);

// app.use('');

// app.get('/', (req, res) => {
//   res.send('hi');
// });

app.listen(3001, () => {
  console.log('running on: http://localhost:3001 ');
});
