const NewsModel = require('../../models/NewsModel')

const NewsService={
    getlist:async({_id})=>{
        if(_id)return NewsModel.find({_id,isPublish:1})
        return NewsModel.find({isPublish:1}).sort({editTime:-1})
    },
    gettoplist:async({limit})=>{
        return NewsModel.find({isPublish:1}).sort({editTime:-1}).limit(limit)
    },
}
module.exports = NewsService