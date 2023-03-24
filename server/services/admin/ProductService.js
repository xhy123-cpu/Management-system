const ProductModel = require('../../models/ProductModel')
const ProductService = {
    add: async ({
        title,
        detail,
        introduction,
        cover
    }) => {
        return ProductModel.create({
            title,
            detail,
            introduction,
            cover,
            editTime: new Date()
        })
    },
    getlist: async (_id) => {
        if (_id) return ProductModel.find({ _id })
        return ProductModel.find()
    },
    delproduct: async (_id) => {
        return ProductModel.deleteOne({ _id })
    },
    updatelist: async ({
        title,
        detail,
        introduction,
        cover, editTime, _id
    }) => {
        if (cover)
            return ProductModel.updateOne({ _id }, {
                title,
                detail,
                introduction,
                cover, editTime,
            })
        else return ProductModel.updateOne({ _id }, {
            title,
            detail,
            introduction,
            editTime,
        })
    },
}
module.exports = ProductService