module.exports = [
    {
        plugin: require('./plugins/mongoose'),
        options: {
            mongoDbUrl: 'mongodb://localhost:10086/qiyue'
        }
    }, {
        plugin: require('./schemas'),
    }, {
        plugin: require('./plugins/auth'),
        options: {
            appKeys: ['123']
        }
    }, {
        plugin: require('./routes/book')
    }, {
        plugin: require('./plugins/response.js')
    },
    {
        plugin: require('./routes/periodical')
    }, {
        plugin: require('./routes/like')
    }, {
        plugin: require('./routes/comment')
    }
]