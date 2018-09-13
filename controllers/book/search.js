var mongoose = require('mongoose');
var data = require('../../spider/data.json');
var Boom = require('boom');
module.exports = {
    description: 'book search list api',
    handler: async function (request, h) {
        let { page, size, keyword } = request.payload;
        if(!page) page = 1;
        if(!size) size = 2;
        const skip = (page - 1) * size;
        console.log('keyword: ', request.payload);
        if(!keyword) return h.success({data:[],page,size,hasMore:false});
        const Book = mongoose.model('Book')
        const hot_book_list = await Book.find({ '$or': [{ title: {'$regex': keyword} }, { author: {'$regex': keyword} }, { summary: {'$regex': keyword} }] }).skip(skip).limit(size);
        const total = await Book.find({ '$or': [{ title: {'$regex': keyword} }, { author: {'$regex': keyword} }, { summary: {'$regex': keyword} }] }).countDocuments();
        const hasMore = skip + size < total
        const data = {
            page,
            size,
            total,
            hasMore,
            data: hot_book_list,
        }

        return h.success(data)
    }
}