var express = require('express');
const NewsController = require('../../controllers/web/NewsController');



var NewsRouter = express.Router();

NewsRouter.get("/webapi/news/list",NewsController.getlist)
NewsRouter.get("/webapi/news/list/:id",NewsController.getlist)
NewsRouter.get("/webapi/news/toplist",NewsController.gettoplist)


module.exports = NewsRouter;