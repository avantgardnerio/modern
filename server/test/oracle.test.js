const { expect, fail } = require('chai');
const oracledb = require('oracledb');

xdescribe('the oracle driver', () => {
  it('should return results', async () => {
    // setup
    const expected = [[42]];
    const config = {
      user: "modern_test",
      password: "password"
    };
    const con = await oracledb.getConnection(config);

    // exercise
    const actual = await con.execute('select 42 from dual');

    // assert
    expect(actual.rows).to.deep.equal(expected);

    // teardown
    await con.close();
  })
})
