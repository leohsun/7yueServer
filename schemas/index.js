'use strict'

var Mongoose = require('mongoose');
var plugin = {};

plugin.register = function( server , options) {
    Mongoose.model('Book',require('./book'));
    Mongoose.model('Periodical',require('./periodical.js'));
    Mongoose.model('Like',require('./like'));
    Mongoose.model('User',require('./user'));
    Mongoose.model('Comment', require('./comment'));
}

plugin.name= 'mongoose-model'
module.exports = plugin