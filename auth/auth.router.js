const { Router } = require("express");
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/isAuth");
require("dotenv").config()

const authRouter = Router();

authRouter.post("/sign-up", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password)
    return res.status(400).json({ message: "email password is required" });
  const existUser = await userModel.findOne({ email });
  if (existUser) return res.status(400).json({ message: "user already exist" });

  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  await userModel.create({fullName,email,password:hashedPassword})

  res.status(201).json({message:"User Created Successfuly"})
});

authRouter.post("/sign-in",async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password) return res.status(400).json({message:"email or password is required"})

    const existUser = await userModel.findOne({email})
    if(!existUser) return res.status(400).json({message:"Email or Password is incorect"})
    const isPasswordEqual = await bcrypt.compare(password,existUser.password)
    if(!isPasswordEqual) return res.status(400).json({message:"Email or Password is incorect"})
    
    const payLoad = {
        userId:existUser._id

    }
    const token = jwt.sign(payLoad,process.env.JWT_SECRET,{expiresIn:"1h"})
    res.json({token})
})

authRouter.get("/current-user", isAuth, async (req,res)=>{
  const user = await userModel.findById(req.userId)
  res.json({
    fullName: user.fullName,
    email: user.email,
    balance: user.balance,
    income: user.income,
    expenses: user.expenses,
  });
})

module.exports = authRouter;
