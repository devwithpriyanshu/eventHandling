const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require('./models/user');
const connectDB = require('./db/connect')
require('dotenv').config();
var jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";
const { auth } = require("./middleware");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
app.use(cors());
app.use(jsonParser);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

const start = async () => {
    try {
      const uri = process.env.MONGO_URI;
      await connectDB(uri);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();

app.get('/',(req,res)=>{
    res.json({
        msg:"Hello World"
    })
})

app.post('/login', async(req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const user = await userModel.findOne({email:email});
    if(!user){
        const newUser = await userModel.create({email:email,name:name});
        const token = jwt.sign(
            {
              email: newUser.email,
            },
            JWT_SECRET
          );
    }
    const token = jwt.sign(
        {
          email: user.email,
        },
        JWT_SECRET
      );
      return  res.status(201).send({token:token,name:name});
    
    }
)
