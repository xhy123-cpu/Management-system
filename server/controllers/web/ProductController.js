const ProductService = require("../../services/web/ProductService")
const ProductController = {
    getlist: async (req, res) => {
        const result = await ProductService.getlist(req.params.id)
        res.send({
            ActionType: 'OK',
            data: result
        })
    },


}
module.exports = ProductController