'use strict'
// var baseURL = require('../../config').baseURL;
var plugin = {}

plugin.register = function (server, options) {

    const Controllers = {
        comment: {
            add: require('../controllers/comment/add'),
            detail: require('../controllers/comment/detail')
        }
    }
    server.route([
        {
            method: 'POST',
            path: '/comment/add',
            config: Controllers.comment.add,
        }, {
            method: 'POST',
            path: '/comment/detail',
            config: Controllers.comment.detail,
        },
    ])

}


plugin.name = 'comment-routes'

module.exports = plugin