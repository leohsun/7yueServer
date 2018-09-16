var mongoose = require('mongoose');
var objectId = mongoose.Types.objectId;
var Boom = require('boom');
module.exports = {
    description: 'like  api',
    handler: async function (request, h) {
        const { appkey } = request.headers;
        const { payload } = request;
        const { periodicalId, bookId } = payload;
        const Like = mongoose.model('Like');
        const data = {
            userId: appkey,
        }
        if(periodicalId) data.periodicalId = periodicalId;
        else if(bookId) data.bookId = bookId;
        else throw Boom.badData('periodicalId and bookId both missing');
        await Like.remove(data);
        return h.success()
    }
}