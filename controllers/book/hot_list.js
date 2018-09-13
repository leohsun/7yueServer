var mongoose = require('mongoose');
var Boom = require('boom');
module.exports = {
    description: 'book hot list api',
    handler: async function (request, h) {
        const hot_length = 10 // default 10
        const Like = mongoose.model('Like');
        const Book = mongoose.model('Book');
        const hot_ids_raw = await Like.aggregate([
            { $group: { _id: "$bookId", total: { $sum: 1 } } }
        ]).sort({ total: -1 });

        const hot_id_list = hot_ids_raw.splice(0, hot_length).map(item => ({_id: item._id}));

        const data = {
            page: 1,
            size: hot_length,
            hasMore: false,
            total: 0,
            data: []
        }

        if (hot_id_list.length) {
            data.data = await Book.find({_id:{'$in': hot_id_list}});
            data.total = await Book.find({_id:{'$in': hot_id_list}}).countDocuments();
        }

        return h.success(data)
    }
}