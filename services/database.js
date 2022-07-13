// modules in suport of connecting to oracle

const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');

// create an initial connection pool based on our database.js configuration
async function initialize() {
  await oracledb.createPool(dbConfig.oraPool);
}

module.exports.initialize = initialize;

// close the connection pool
async function close() {
  await oracledb.getPool().close(0);
}

module.exports.close = close;

// execute a sql query via the connection pool
async function simpleExecute(statement, binds = [], opts = {}) {
  let conn;
  let result = [];

  opts.outFormat = oracledb.OBJECT;

  try {
    // get a connection from the pool
    conn = await oracledb.getConnection();

    // exec query and return results
    result = await conn.execute(statement, binds, opts);
    return (result);
  } catch (err) {
    console.error(err);
    throw (err);
  } finally {
    if (conn) { // conn assignment worked, need to close
      try {
        // release the connection back to the pool
        await conn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports.simpleExecute = simpleExecute;
