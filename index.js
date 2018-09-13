const plugins = require('./plugin.index');
const Hapi = require('hapi');
const server = Hapi.server({
    host: 'localhost',
    port: 4445
})



async function start(params) {
    await server.register(plugins);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});


start();
