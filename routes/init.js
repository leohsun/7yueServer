'use strict'
// var baseURL = require('../../config').baseURL;
var plugin = {}

plugin.register = function (server, options) {

    const Controllers = {
        init: require('../controllers/init.js')
    }
    server.route([
        {
            method: 'GET',
            path: '/init',
            config: Controllers.init
        }
    ])

}


plugin.name = 'initDB-routes'

module.exports = plugin