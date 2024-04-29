const express=require("express");

const mongoose=require("mongoose");


mongoose.connect("mongodb+srv://bigyanacharya224:oZ3igODS2LVBndmK@signup-login.jt9ancr.mongodb.net/?retryWrites=true&w=majority&appName=signup-login");

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String
})

module.exports=mongoose.model("user",userSchema);