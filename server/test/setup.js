console.log('------ setting up tests ---------');
process.env.VCAP_SERVICES = {
    mysql: {
        credentials: {
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            name: 'modern_test'
        }
    }
}