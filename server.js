const oracledb = require('oracledb');
const express = require('express');
const app = express();

const port = parseInt(process.env.PORT) || 8080;

console.log('starting');
console.log('attempting to establish a db connection');
try {
  const connection = await oracledb.getConnection({
    user: process.env.NODE_ORACLEDB_USER,
    password: process.env.NODE_ORACLEDB_PASSWORD,
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING
  });
} catch (error) {
  console.error(error)
}

console.log('db connection established');


app.get('/', (req, res) => {	
  console.log('attempting query');
  const result = await connection.execute(
    `SELECT TO_CHAR(CURRENT_DATE, 'DD-Mon-YYYY HH24:MI:SS') AS D FROM DUAL`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  console.log('query completed');

  const result_string = JSON.stringify(await result);
	
  res.send(`Date from DB Query is ${result_string}!`);
});

app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
// TODO: Close connection on SIG_TERM
