const UserModel = require('../../models/UserModel.js')

const UserService={
    login:async({username,password})=>{
        return UserModel.find({
            username,
            password
        })
    },
    upload:async({_id,username,introduction,gender,avatar})=>{
        if(avatar)
        return UserModel.updateOne({_id},{username,introduction,gender,avatar})
        else
        return UserModel.updateOne({_id},{username,introduction,gender})
    },
    add:async({username,introduction,gender,avatar,role,password})=>{
        return UserModel.create({username,introduction,gender,avatar,role,password})
    },
    getlist:async({id})=>{
        if(id)return UserModel.find({_id:id},['username','role','introduction','gender','password'])
        return UserModel.find({},['username','role','introduction','gender','avatar'])
    },
    dellist:async(_id)=>{
        return UserModel.deleteOne({_id})
    },
    putlist:async(data)=>{
        return UserModel.updateOne({_id:data._id},data)
    }
}
module.exports=UserService