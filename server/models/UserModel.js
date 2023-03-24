const mongoose = require('mongoose')
const Schema=mongoose.Schema
const UserType = {
    username:String,
    password:String,
    gender:Number,
    introduction:String,
    avatar:String,
    role:Number
}

module.exports= mongoose.model("user",new Schema(UserType))
