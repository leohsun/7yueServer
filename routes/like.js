'use strict'
// var baseURL = require('../../config').baseURL;
var plugin = {}

plugin.register = function (server, options) {

        const Controllers = {
                like: {
                        like: require('../controllers/like/like'),
                        dislike: require('../controllers/like/dislike')
                }
        }
        server.route([
                {
                        method: 'POST',
                        path: '/like',
                        config: Controllers.like.like,
                },
                {
                        method: 'POST',
                        path: '/dislike',
                        config: Controllers.like.dislike,
                },
        ])

}


plugin.name = 'like-routes'

module.exports = plugin