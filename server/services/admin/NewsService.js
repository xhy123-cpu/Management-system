const NewsModel = require('../../models/NewsModel')
const NewsService = {
    add: async ({
        title,
        content,
        isPublish,
        category,
        editTime,
        cover
    }) => {
        return NewsModel.create({
            title,
            content,
            isPublish,
            category,
            editTime,
            cover
        })
    },
    updatelist: async ({
        title,
        content,
        isPublish,
        category,
        editTime,
        cover,
        _id
    }) => {
        if(cover)
        return NewsModel.updateOne({_id},{
            title,
            content,
            isPublish,
            category,
            editTime,
            cover
        })
        else return NewsModel.updateOne({_id},{
            title,
            content,
            isPublish,
            category,
            editTime,
        })
    },
    getlist:async(_id)=>{
        if(_id)return NewsModel.find({_id})
        return NewsModel.find()
    },
    publish:async({_id,isPublish,editTime})=>{
        return NewsModel.updateOne({_id},{isPublish,editTime})
    },
    delnews:async(_id)=>{
        return NewsModel.deleteOne({_id})
    },
}
module.exports = NewsService