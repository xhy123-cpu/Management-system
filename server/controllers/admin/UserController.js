const UserService = require("../../services/admin/UserService")
const JWT = require('../../util/JWT.js')

const UserController = {
    login: async (req, res) => {
        let result = await UserService.login(req.body)
        if (result.length === 0) {
            res.send({
                code: "-1",
                error: "用户名密码不匹配"
            })
        } else {
            const token = JWT.generate(
                {
                    id: result[0]._id,
                    username: result[0].username
                }, '1d'
            )
            res.header('Authrorization', token)
            res.send({
                ActionType: "ok",
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0,
                    introduction: result[0].introduction,
                    avatar: result[0].avatar,
                    role: result[0].role
                }
            })
        }
    },
    upload: async (req, res) => {
        const { username, introduction, gender } = req.body
        console.log(req.body, req.file);
        const token = req.headers['authorization'].split(' ')[1]
        let avatar
        if (req.file) avatar = `/avataruploads/${req.file.filename}`
        else avatar = ''
        let payload = JWT.verify(token)
        console.log(payload.id);
        await UserService.upload({ _id: payload.id, username, introduction, gender: Number(gender), avatar })
        if (avatar) {
            res.send({
                ActionType: 'OK',
                data: {
                    username, introduction, gender: Number(gender), avatar
                }
            })
        }
        else {
            res.send({
                ActionType: 'OK',
                data: {
                    username, introduction, gender: Number(gender),
                }
            })
        }
    },
    add: async (req, res) => {
        const { username, introduction, gender, role, password } = req.body
        // console.log(req.body, req.file);
        let avatar
        if (req.file) avatar = `/avataruploads/${req.file.filename}`
        else avatar = ''
        // console.log(payload.id);
        await UserService.add({
            username, introduction,
            gender: Number(gender), avatar, role: Number(role), password
        })
        res.send({
            ActionType: 'OK',
        })
    },
    getlist: async (req, res) => {
        const result = await UserService.getlist({_id:req.params.id})
        res.send({
            ActionType:'OK',
            data:result
        })
    },
    dellist:async(req,res)=>{
        console.log(req.params.id);
        const result=await UserService.dellist(req.params.id)
        res.send({
            ActionType:'OK'
          })
    },
    putlist:async(req,res)=>{
        const result=await UserService.putlist(req.body)
        res.send({
            ActionType:'OK',
            res:result
        })
    }
}
module.exports = UserController