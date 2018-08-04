process.env.VCAP_SERVICES = JSON.stringify({
    mysql: {
        credentials: {
            host: '127.0.0.1',
            user: 'sys as SYSDBA',
            password: 'Oradoc_db1',
            name: 'modern_test'
        }
    },
    oracle: {
        credentials: {
            user: "modern_test",
            password: "password",
            name : "localhost:1521/ORCLCDB.localdomain"
        }
    }
});

before(async () => {
    try {
        console.log('------ setting up tests ---------');
        const knex = require('../db');
        await knex.migrate.latest();
        console.log('------ running tests ---------');
    } catch(ex) {
        console.error(ex);
        process.exit(-1);
    }
});

after(async () => {
    console.log('------ cleaning up ---------');
    const knex = require('../db');
    await knex.destroy();
    console.log('-------- done ---------');
})

