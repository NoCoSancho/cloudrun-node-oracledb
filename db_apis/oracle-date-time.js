// db query api to get curent date and time
const database = require('../services/database.js');

// default query to get date and time from database
const baseQuery =
  `SELECT TO_CHAR(CURRENT_DATE, 'DD-Mon-YYYY HH24:MI:SS') AS D
 FROM DUAL`;

async function getcurrentdatetime() {
  let query = baseQuery;
  const binds = {};

  // pass the query to simple sql execute function
  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.getcurrentdatetime = getcurrentdatetime;
