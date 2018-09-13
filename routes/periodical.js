'use strict'
// var baseURL = require('../../config').baseURL;
var plugin = {}

plugin.register = function (server, options) {

        const Controllers = {
                periodical: {
                        list: require('../controllers/periodical/list'),
                        detail: require('../controllers/periodical/detail')
                }
        }
        server.route([
                {
                        method: 'GET',
                        path: '/periodical/list',
                        config: Controllers.periodical.list,
                },
                {
                        method: 'GET',
                        path: '/periodical/detail',
                        config: Controllers.periodical.detail,
                },
        ])

}


plugin.name = 'periodical-routes'

module.exports = plugin