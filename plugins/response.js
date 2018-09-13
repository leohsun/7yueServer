'use strict'
var Boom = require('boom');
var appkeyofAllow = require('../appkeys');
var plugin = {}

plugin.register = function (server, options) {

    server.decorate('toolkit', 'success', success);
    
}

function success(data){
    return this.response({ ...data, statusCode: 200,message:'success'});
}

plugin.name='handeler_succusee_decorator'
module.exports = plugin