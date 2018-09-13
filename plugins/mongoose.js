'use strict'

var Mongoose = require('mongoose');
var Hoek = require('hoek');
let maxTry = 5;
const plugin = {}
plugin.register = function (server, options) {
    Hoek.assert(options.mongoDbUrl, 'mongodb url is invalid');
    Mongoose.connect(options.mongoDbUrl,{ useNewUrlParser: true });
    Mongoose.connection.on('disconnect', function () {
        maxTry--;
        if (!maxTry) return Hoek.assert(maxTry === 0, 'mongodb connected failed, plz repair it');
        Mongoose.connect(options.mongoDbUrl);
    })
    Mongoose.connection.once('open', function () {
        console.log('mongodb connected successful...')
    })
}

plugin.name = 'mongoose'
plugin.version = '1.0.0'
module.exports = plugin