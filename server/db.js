const connect = require('knex');
const config = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'modern'
    }
};
const pool = connect(config);
module.exports = pool;