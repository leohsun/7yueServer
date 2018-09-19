var mongoose = require('mongoose');
var objectId = mongoose.Types.objectId;
var Boom = require('boom');
module.exports = {
    description: 'get comment detail api',
    handler: async function (request, h) {
        const { appkey } = request.headers;
        const { payload } = request;
        let { type, id, page, size } = payload;
        if (!type || (type !== 'book' && type !== 'periodical')) throw Boom.badData('type mast be on of book and periodical');
        if (!page) page = 1;
        if (!size) size = 2;
        const Comment = mongoose.model('Comment');
        const query = { type, id };
        const skip = (page - 1) * size;
        const comment_list = await Comment.find(query).skip(skip).limit(size);
        const total = await Comment.find(query).countDocuments();
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