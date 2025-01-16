const express = require('express');
const connectToDb = require('./db/connectToMondoDb');
const authRouter = require('./auth/auth.router');
const userRouter = require('./routes/users/users.router');

const app = express();
const cors = require("cors")
app.use(express.json());
app.use(cors());

connectToDb();

// app.use('');

// app.get('/', (req, res) => {
//   res.send('hi');
// });
app.use("/auth",authRouter)
app.use("/users", userRouter)
app.listen(3001, () => {
  console.log('running on: http://localhost:10000 ');
});
