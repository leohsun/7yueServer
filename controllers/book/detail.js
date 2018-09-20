var mongoose = require('mongoose');
var Boom = require('boom');
var ObjectId = mongoose.Types.ObjectId;
module.exports = {
    description: 'book detail api',
    handler: async function (request, h) {
        const { id } = request.url.query;
        if(!ObjectId.isValid(id)) throw Boom.badData('id must be an ObjectId string');
        const Like = mongoose.model('Like');
        const Book = mongoose.model('Book');
        const hot_raw = await Like.aggregate([
            {
                $match: { type: 'book' }
            }, {
                $group: { _id: '$id', total: { '$sum': 1 } }
            }, {
                $sort: { total: -1 }
            }
        ]);

        let fav_nums = 0;
        for (let i =0, len = hot_raw.length; i < len; i++) {
            if(hot_raw[i]._id === id) {
                fav_nums = hot_raw[i].total
                break;
            }
        }
        bookdocs = await Book.findOne({ _id: id });
        const { _id, title, author, cover, summary } = bookdocs;
        const data = {
            data: { _id, title, author, cover, summary,fav_nums }
        }


        return h.success(data)
    }
}