const User = require('../models/userModel')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const asynchandler = require("express-async-handler")

//register users
//@route POST api/users/rregister
//@access public

const registeruser = asynchandler( async (req,res)=> {
    
   const {username,email,password}= req.body;
   if(!username || !email || !password){
    res.status(400);
    throw new Error("All fields are required")
   }
   const  useravailable = await User.findOne({email});
   if(useravailable){
    res.status(400);
    throw new Error("User already registred")
   }
   
   //Hashpassword
   const hashedpassword = await bcrypt.hash(password,10)
   console.log("hashed paswword",hashedpassword)
  const user = await User.create({
    username,
    email,
    password: hashedpassword,
  })
  console.log(`user created ${user}`);
  if(user){
    res.status(201).json({_id:user.id,email:user.email})
  } else {
    res.status(400);
    throw new Error('user data not valid')
  }

   
    res.status(200).json({ message : "register user"})
})

//login users
//@route POST api/users/login
//@access public

const loginuser = asynchandler( async (req,res)=> {
    
  const {email,password}= req.body;
  if(!email || !password) {
    res.status(404);
    throw new Error("all fields required")
  }
  const user = await User.findOne({email})
  //compare password with hashed password
  if( user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign({
      user : {
        username : user.username,
        email: user.email,
        id: user.id,
      },
    }, 
    process.env.ACCESS_TOKEN_SECRET ,
    { expiresIn :'1m'}
    )
    res.status(200).json({accessToken})
  } else {
    res.status(401)
    throw new Error( "email or password not valid")
  }

   
})


//current user info
//@route POST api/users/current
//@access public

const currentuser= asynchandler( async (req,res)=> {
    res.json(req.user)

    
})

module.exports= {registeruser,loginuser,currentuser}