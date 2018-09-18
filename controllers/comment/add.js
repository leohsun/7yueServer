var mongoose = require('mongoose');
var objectId = mongoose.Types.objectId;
var Boom = require('boom');
module.exports = {
    description: 'add comment  api',
    handler: async function (request, h) {
        const { appkey } = request.headers;
        const { payload } = request;
        const { type, id, comment } = payload;
        const Comment = mongoose.model('Comment');
        const data = {
            type,
            id,
            comment,
            userId: appkey,
        }
        if (!type || type!=='book' || type !== 'periodical') throw Boom.badData('type mast be on of book and periodical');
        if(!comment) throw Boom.badData('plase write something');
        await Comment.create(data);
        return h.success()
    }
}