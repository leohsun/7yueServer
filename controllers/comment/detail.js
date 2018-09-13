var mongoose = require('mongoose');
var baseURL = require('../../config').baseURL;
// var datas = require('../../periodical.json');
var objectId = mongoose.Types.objectId;
var Boom = require('boom');
module.exports = {
    description: 'get comment api',
    handler: async function (request, h) {
        const { appkey } = request.headers;
        const { payload } = request;
        let { periodicalId, bookId, page, size } = payload;
        if(!page) page = 1;
        if(!size) size = 2;
        const Comment = mongoose.model('Comment');
        const data = {};
        if (periodicalId) data.periodicalId = periodicalId;
        else if (bookId) data.bookId = bookId;
        else throw Boom.badData('periodicalId and bookId both missing');
        const skip = (page - 1) * size;
        const comment_list = await Comment.find(data).skip(skip).limit(size);
        const total = await Comment.find(data).countDocuments();
        const hasMore = skip + size < total
        const res = {
            page,
            size,
            total,
            hasMore,
            data: comment_list,
        }
        return h.success(res)
    }
}