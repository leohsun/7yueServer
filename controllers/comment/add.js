var mongoose = require('mongoose');
var objectId = mongoose.Types.objectId;
var Boom = require('boom');
module.exports = {
    description: 'add comment  api',
    handler: async function (request, h) {
        const { appkey } = request.headers;
        const { payload } = request;
        const { periodicalId, bookId, comment } = payload;
        const Comment = mongoose.model('Comment');
        const data = {
            comment,
            userId: appkey,
        }
        if(periodicalId) data.periodicalId = periodicalId;
        else if(bookId) data.bookId = bookId;
        else throw Boom.badData('periodicalId and bookId both missing');
        if(!comment) throw Boom.badData('plase write something');
        console.log(data);
        await Comment.create(data);
        return h.success()
    }
}