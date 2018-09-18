var mongoose = require('mongoose');
var Boom = require('boom');
module.exports = {
    description: 'periodical item api',
    handler: async function (request, h) {
        const userId = request.headers.appkey || 0;
        const idx = +request.url.query.index || 'latest'
        const Periodical = mongoose.model('Periodical');
        const periodical_list = idx !== 'latest' ? await Periodical.find({ index: idx }) : await Periodical.find().sort({ index: -1 });
        const { type, content, index, title, image, _id, source_url } = periodical_list[0];
        const preIdx = index - 1;
        const nextIdx = index + 1;
        const previours = await Periodical.findOne({ index: preIdx });
        const next = await Periodical.findOne({ index: nextIdx });
        const Like = mongoose.model('Like');
        const fav_nums = await Like.find({ periodicalId: _id }).countDocuments();
        const like_status = await Like.find({ '$and': [{ periodicalId: _id }, { userId }] }).countDocuments();
        const data = {
            data: { type, content, index, title, image, fav_nums, like_status, previours, next, source_url }
        }


        return h.success(data)
    }
}