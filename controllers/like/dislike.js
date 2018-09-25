var mongoose = require('mongoose');
var objectId = mongoose.Types.objectId;
var Boom = require('boom');
module.exports = {
    description: 'like  api',
    handler: async function (request, h) {
        const { appkey } = request.headers;
        const { payload } = request;
        const { type, id } = payload;
        const Like = mongoose.model('Like');
        const data = {
            type,
            id,
            userId: appkey,
        }
        if (!type || (type!=='book' && type !== 'periodical')) throw Boom.badData('type mast be on of book and periodical');
        await Like.remove(data);
        return h.success()
    }
}