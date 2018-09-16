var mongoose = require('mongoose');
var Boom = require('boom');
module.exports = {
    description: 'periodical list api',
    handler: async function (request, h) {
        const Periodical = mongoose.model('Periodical');
        const periodical_list = await Periodical.find({});
        const total = await Periodical.countDocuments();
        const data = {
            total,
            data: periodical_list,
        }

        return h.success(data)
    }
}