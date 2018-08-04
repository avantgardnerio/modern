const { expect, fail } = require('chai');
const oracledb = require('oracledb');
const knex = require('knex');

describe('knex', () => {
    it('should return results', (done) => {
        console.log('connecting...')
        const con = knex({
            client: 'oracledb',
            connection: {
                user: "modern_test",
                password: "password",
                connectString : "localhost:1521/ORCLCDB.localdomain"
            }
        });
        console.log('querying...', con.raw)
        const promise = con.raw('select 42 as test from dual');
        console.log('promise...', promise)
        promise.then((result, err) => {
            expect(result).to.deep.equal([{TEST: 42}]);
            done();
        })
        promise.catch(err => {
            console.error(err);
            done(err);
        })
        console.log('waiting...')
    })
})
