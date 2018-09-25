var mongoose = require('mongoose');
var objectId = mongoose.Types.objectId;
var Boom = require('boom');
module.exports = {
    description: 'like  api',
    handler: async function (request, h) {
        const { appkey } = request.headers;
        const { payload } = request;
        const { id, type } = payload;
        const Like = mongoose.model('Like');
        const data = {
            id,
            type,
            userId: appkey,
        }
        if (!type || (type!=='book' && type !== 'periodical')) throw Boom.badData('type mast be on of book and periodical');
        const isExist = await Like.find(data);
        if (isExist.length) {
            throw Boom.conflict('duplicated opration!!')
        }

        await Like.create(data);

        return h.success()
    }
}