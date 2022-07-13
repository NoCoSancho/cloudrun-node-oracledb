const database = require('../services/database.js');

const baseQuery =
 `SELECT TO_CHAR(CURRENT_DATE, 'DD-Mon-YYYY HH24:MI:SS') AS D
 FROM DUAL`;

async function getcurrentdatetime() {
  let query = baseQuery;
  const binds = {};

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.getcurrentdatetime=getcurrentdatetime;
