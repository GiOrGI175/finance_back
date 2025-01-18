const express = require('express');

const connectToDb = require('./db/connectToMondoDb');
const usersRouter = require('./routes/users/users.router');
const potsRouter = require('./routes/pots/pots.router');
const authRouter = require('./auth/auth.router');
const userRouter = require('./routes/users/users.router');
const transactionRouter = require("./routes/transaction/transaction.router")


const app = express();
const cors = require("cors");
const transactionsModel = require('./model/transactions.model');
const corsOptions = {
  origin: ['https://finance-orcin-tau.vercel.app' ,'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

connectToDb();

app.use('/users', usersRouter);
app.use('/pots', potsRouter);

// app.use('');

// app.get('/', (req, res) => {
//   res.send('hi');
// });
app.use("/auth",authRouter)
app.use("/users", userRouter)
app.use('/transactions', transactionRouter);
// app.use("/transaction",transactionRouter);
app.get("/add", async(req,res)=>{
  await transactionsModel.insertMany()

})

app.listen(3001, () => {
  console.log('running on: http://localhost:3001 ');
});
