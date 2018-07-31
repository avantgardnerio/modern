process.env.VCAP_SERVICES = JSON.stringify({
    mysql: {
        credentials: {
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            name: 'modern_test'
        }
    }
});

before(async () => {
    try {
        console.log('------ setting up tests ---------');
        const knex = require('../db');
        await knex.migrate.latest();
        await knex.destroy();
        console.log('------ running tests ---------');
    } catch(ex) {
        console.error(ex);
        process.exit(-1);
    }
});

