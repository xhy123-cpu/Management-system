var express = require('express');
const ProductController = require('../../controllers/admin/ProductController');
const multer  = require('multer')
const upload = multer({ dest: 'public/productuploads/' })


var ProductRouter = express.Router();
ProductRouter.post("/adminapi/product/add",upload.single('file'),ProductController.add)
ProductRouter.get("/adminapi/product/list",ProductController.getlist)
ProductRouter.post("/adminapi/product/list",upload.single('file'),ProductController.updatelist)
ProductRouter.get("/adminapi/product/list/:id",ProductController.getlist)
ProductRouter.delete("/adminapi/product/list/:id",ProductController.delproduct)

module.exports = ProductRouter;