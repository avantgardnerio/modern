const connect = require('knex');
const vcap = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : undefined;
const config = {
    client: 'oracledb',
    connection: {
        host: vcap ? vcap.mysql.credentials.host : '127.0.0.1',
        user: vcap ? vcap.mysql.credentials.user : 'root',
        password: vcap ? vcap.mysql.credentials.password : 'password',
        database: vcap ? vcap.mysql.credentials.name : 'modern'
    }
};
console.log(`connecting to ${config.connection.database}...`);
const pool = connect(config);
module.exports = pool;