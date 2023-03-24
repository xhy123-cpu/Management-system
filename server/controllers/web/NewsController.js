const NewsService = require("../../services/web/NewsService")
const NewsController = {
    getlist: async (req, res) => {
        const result = await NewsService.getlist({_id:req.params.id})
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    gettoplist:async (req, res) => {
        const result = await NewsService.gettoplist({limit:req.query.limit})
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
}

module.exports = NewsController