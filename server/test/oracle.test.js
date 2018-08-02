const { expect } = require('chai');
const oracledb = require('oracledb');

describe('the oracle driver', () => {
  it('should return results', (done) => {
    oracledb.getConnection(
      {
        user: "modern_test",
        password: "password"
      },
      function (err, connection) {
        if (err) {
          console.error('--------', err.message);
          return;
        }
        connection.execute(
          `select 42 from dual`,
          //[],  // bind value for :id
          function (err, result) {
            if (err) {
              console.error('========', err.message);
              doRelease(connection);
              return;
            }
            console.log(result.rows);
            expect(result.rows).to.deep.equal([[42]]);
            doRelease(connection);
          });
      });

    function doRelease(connection) {
      connection.close(
        function (err) {
          if (err) {
            console.error(err.message);
          }
          done();
        });
    }
  })
})
