const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser = require('body-parser');
const bcrypt=require("bcrypt");
const usermodel=require('./model/user');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');




app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://signup-login-frontend.vercel.app', // Specify the allowed origin
    methods:["POST" ,  "GET"],
    credentials: true, // Allow sending cookies and other credentials
}));


app.get("/",(req,res)=>{
    res.send("the server is running");
});
app.post("/signup",(req,res)=>{
    let {username,email,password}=req.body;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
            let user=await usermodel.create({
                username,email,password:hash
            })
            res.send(user)
        });
    });
});
app.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    let user=await usermodel.findOne({email});
    if(!user){
        res.status(401);
         res.send("user not found");
    }
    else{
        let hash=await user.password;
    bcrypt.compare(password, hash).then(function(result) {
        if(result){
            let token = jwt.sign({email:user.email}, 'shhhhh');
            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'strict' });

            res.status(200);
            res.send("login success")
        }
        else{
            res.status(400);
            res.send("wrong password")
        }
      });
    }
    
});


app.get("/profile", async (req, res) => {
    try {
        // Retrieve the token from cookies
        let token = req.cookies.token;

        // Check if the token is provided
        if (!token) {
            
            return res.status(401).send("Unauthorized: JWT must be provided.");
        }

        // Verify the token with the secret key
        let decoded = jwt.verify(token,'shhhhh');

        // Look up the user in the database by email
        let user = await usermodel.findOne({ email:decoded.email });

        // Check if the user exists
        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Send the user data as the response
        res.send(user);
    } catch (error) {
        // Log the error for debugging
        console.error("Error in /profile route:", error);

        // Handle errors (e.g., invalid token)
        if (error.name === "JsonWebTokenError") {
            return res.status(401).send("Invalid token.");
        } else {
            return res.status(500).send("Internal server error.");
        }
    }
});

app.post("/logout",(req,res)=>{
    res.clearCookie("token");
    res.send("logged out");
})


app.listen(3000,()=>{
    console.log("server running at port : 3000");
});
