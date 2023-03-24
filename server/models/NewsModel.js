const mongoose = require('mongoose')
const Schema=mongoose.Schema
const NewsType = {
    title:String,
    content:String,
    isPublish:Number,
    category:Number,
    editTime:Date,
    cover:String
}
const NewsModel=mongoose.model("news",new Schema(NewsType))
module.exports= NewsModel