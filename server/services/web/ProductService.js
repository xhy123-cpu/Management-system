const ProductModel = require('../../models/ProductModel')
const ProductService = {

    getlist: async (_id) => {
        if (_id) return ProductModel.find({ _id })
        return ProductModel.find()
    },

}
module.exports = ProductService