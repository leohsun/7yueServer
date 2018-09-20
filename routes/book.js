'use strict';

var plugin = {}

plugin.register = function(server, options) {
    const Controllers = {
        book: {
            detail: require('../controllers/book/detail'),
            hot_list: require('../controllers/book/hot_list'),
            search: require('../controllers/book/search')
        }
    }

    server.route([
        {
            method: 'GET',
            path: '/book/hot_list',
            config: Controllers.book.hot_list,
        },
        {
            method: 'GET',
            path: '/book/detail',
            config: Controllers.book.detail,
        },
        {
            method: 'POST',
            path: '/book/search',
            config: Controllers.book.search,
        },
       
    ])
}


plugin.name = 'book-routes'

module.exports = plugin