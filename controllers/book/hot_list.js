var mongoose = require('mongoose');
var Boom = require('boom');
module.exports = {
    description: 'book hot list api',
    handler: async function (request, h) {
        const hot_length = 10 // default 10
        const Like = mongoose.model('Like');
        const Book = mongoose.model('Book');
        const Comment = mongoose.model('Comment');
        const hot_raw = await Like.aggregate([
            {
                $match: { type: 'book' }
            }, {
                $group: { _id: '$id', total: { '$sum': 1 } }
            }, {
                $sort: { total: -1 }
            }, {
                $limit: 10
            }
        ]);

        const comment_raw = await Comment.aggregate([
            {
                $match:{type:'book'}
            },{
                $group: {_id: '$id', total: {'$sum': 1}}
            }
        ])

        const hot_id_list = hot_raw.map(item => item._id);

        const data = {
            page: 1,
            size: hot_length,
            hasMore: false,
            total: 0,
            data: []
        }

        if (hot_id_list.length) {
            bookdocs = await Book.find({ _id: { '$in': hot_id_list } });
            const docswidthfavnums = bookdocs.map(item => {
                const id = item._id.toString();
                let fav_nums = 0
                let comment_nums = 0
                for (let i = 0, len = hot_raw.length; i < len; i++) {
                    if (hot_raw[i]._id.toString() === id) {
                        fav_nums = hot_raw[i].total;
                        break;
                    }
                }

                for (let i = 0, len = comment_raw.length; i < len; i++) {
                    if (comment_raw[i]._id.toString() === id) {
                        comment_nums = comment_raw[i].total;
                        break;
                    }
                }

                const { _id, title, author, cover, summary } = item;

                return { _id, title, author, cover, summary, fav_nums, comment_nums };
            })
            data.data = docswidthfavnums;

            data.total = await Book.find({ _id: { '$in': hot_id_list } }).countDocuments();
        }

        return h.success(data)
    }
}