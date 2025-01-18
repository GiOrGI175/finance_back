const express = require('express');
const connectToDb = require('./db/connectToMondoDb');
const usersRouter = require('./routes/users/users.router');
const potsRouter = require('./routes/pots/pots.router');
const authRouter = require('./auth/auth.router');
const userRouter = require('./routes/users/users.router');
const transactionRouter = require('./routes/transaction/transaction.router');

const app = express();
const cors = require('cors');
const transactionsModel = require('./model/transactions.model');
const budgetsRouter = require('./routes/budgets/budgets.router');

app.use(express.json());
app.use(cors());

connectToDb();

app.use('/users', usersRouter);
app.use('/pots', potsRouter);
app.use('/budgets', budgetsRouter);

// app.use('');

// app.get('/', (req, res) => {
//   res.send('hi');
// });
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/transactions', transactionRouter);

app.listen(3001, () => {
  console.log('running on: http://localhost:3001 ');
});
