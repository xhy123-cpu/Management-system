const NewsService = require("../../services/admin/NewsService")
const NewsController = {
    add: async (req, res) => {
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
        const { title, content, category, isPublish } = req.body
        await NewsService.add(
            {
                category: Number(category),
                isPublish: Number(isPublish),
                title, content, cover, editTime: new Date()
            }
        )
        res.send({
            ActionType: "OK"
        })
    },
    updatelist: async (req, res) => {
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
        const { title, content, category, isPublish, _id } = req.body
        await NewsService.updatelist(
            {
                category: Number(category),
                isPublish: Number(isPublish),
                title, content, cover, editTime: new Date(), _id
            }
        )
        res.send({
            ActionType: "OK"
        })
    },
    getlist: async (req, res) => {
        const result = await NewsService.getlist(req.params.id)
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    publish: async (req, res) => {
        const result = await NewsService.publish({ ...req.body, editTime: new Date() })
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    delnews: async (req, res) => {
        const result = await NewsService.delnews(req.params.id)
        res.send({
            ActionType: 'OK',
            data: result
        })
    },


}
module.exports = NewsController