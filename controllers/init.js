var mongoose = require('mongoose');
var Boom = require('boom');
const boodData = require('../spider/bookData.json');
const periodicalData = require('../spider/periodical.json');
module.exports = {
    description: 'init mongodb data  api',
    handler: async function (request, h) {
        const {key} = request.query;
        if (key !== 'plzinitmongodb') {
            throw Boom.unauthorized('you are not the amdin, do not do this')
        }

        const Book = mongoose.model('Book');
        const Periodical = mongoose.model('Periodical');
        await Book.create(boodData)
        await Periodical.create(periodicalData)
        
        return h.success();
    }
}