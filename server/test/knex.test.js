const { expect } = require('chai');
const knex = require('knex');

xdescribe('knex', () => {
    it('should return results', async () => {
        const con = knex({
            client: 'oracledb',
            connection: {
                user: "modern_test",
                password: "password",
                connectString : "localhost:1521/ORCLCDB.localdomain"
            }
        });
        const result = await con.raw('select 42 as test from dual');
        expect(result).to.deep.equal([{TEST: 42}]);
    })
});
