const ProductService = require("../../services/admin/ProductService")
const ProductController = {
    add: async (req, res) => {
        const cover = req.file ? `/productuploads/${req.file.filename}` : ''
        const { title, detail, introduction, } = req.body
        await ProductService.add(
            {
                title,
                detail,
                introduction,
                cover
            }
        )
        res.send({
            ActionType: "OK"
        })
    },
    getlist: async (req, res) => {
        const result = await ProductService.getlist(req.params.id)
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    delproduct: async (req, res) => {
        const result = await ProductService.delproduct(req.params.id)
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    updatelist: async (req, res) => {
        const cover = req.file ? `/productuploads/${req.file.filename}` : ''
        const { title, detail, introduction, _id } = req.body
        await ProductService.updatelist(
            {
                title,
                detail,
                introduction,
                cover, editTime: new Date(), _id
            }
        )
        res.send({
            ActionType: "OK"
        })
    },
}
module.exports = ProductController