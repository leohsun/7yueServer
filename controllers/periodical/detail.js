var mongoose = require('mongoose');
var baseURL = require('../../config').baseURL;
// var datas = require('../../periodical.json');
var Boom = require('boom');
module.exports = {
    description: 'periodical item api',
    handler: async function (request, h) {
        console.log(request.headers)
        const userId = request.headers.appkey || 0;
        const idx = +request.url.query.index || 1
        const Periodical = mongoose.model('Periodical');
        const periodical_list = await Periodical.find({ index: idx });
        const total = await Periodical.countDocuments();
        const { type, content, index, title, _id } = periodical_list[0];
        const Like = mongoose.model('Like');
        const fav_nums = await Like.find({ periodicalId: _id }).countDocuments();
        const like_status = await Like.find({'$and':[{periodicalId: _id },{userId}]}).countDocuments();
        const data = {
            total,
            data: { type, content, index, title, fav_nums, like_status }
        }

        return h.success(data)
    }
}