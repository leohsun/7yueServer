'use strict'
var Boom = require('boom');
var appkeyofAllow = require('../appkeys');
var plugin = {}

plugin.register = function (server, options) {
    server.auth.scheme('auth_appkey', appKeyScheme);
    server.auth.strategy('auth_appkey','auth_appkey');
    server.auth.default('auth_appkey');
}

// server.auth.strategy(name, scheme, [options])
function appKeyScheme(server, options) {
    return {
        authenticate: function (request, h) {
            const appkey = request.headers.appkey;
            if(!appkey || !appkeyofAllow.includes(appkey)){
                throw Boom.unauthorized('missing appkey');
            }
            return h.authenticated({ credentials: { appkey: appkey } });
        }
    }
}
plugin.name='auth_appkey'
module.exports = plugin