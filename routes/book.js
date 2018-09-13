'use strict';

var plugin = {}

plugin.register = function(server, options) {
    const Controllers = {
        book: {
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
        
        // {
        //     method: 'POST',
        //     path: '/book/<int:book_id>/short_comment',
        //     config: Controllers.book.short_comment,
        // },
        // {
        //     method: 'POST',
        //     path: '/book/add/short_comment',
        //     config: Controllers.book.short_comment,
        // },
        // {
        //     method: 'POST',
        //     path: '/book/hot_keyword',
        //     config: Controllers.book.hot_keyword,
        // },
        {
            method: 'POST',
            path: '/book/search',
            config: Controllers.book.search,
        },
        // {
        //     method: 'POST',
        //     path: '/book/:id/detail',
        //     config: Controllers.book.detail,
        // },
        // {
        //     method: 'POST',
        //     path: '/book/favor/count',
        //     config: Controllers.book.favor,
        // }
    ])
}


plugin.name = 'book-routes'

module.exports = plugin