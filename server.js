const oracledb = require('oracledb');
const express = require('express');
const app = express();

//app.get('/', (req, res) => {
//  const name = process.env.NAME || 'World';
//  res.send(`Hello ${name}!`);
//});

const port = parseInt(process.env.PORT) || 8080;

console.log('starting');
async function run() {

  let connection;

  try {
console.log('attempting to establish a db connection');
	  connection = await oracledb.getConnection({
  user: process.env.NODE_ORACLEDB_USER,
  password: process.env.NODE_ORACLEDB_PASSWORD,
  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING
});


console.log('db connection established');
console.log('attempting query');

const result = await connection.execute(
  `SELECT TO_CHAR(CURRENT_DATE, 'DD-Mon-YYYY HH24:MI:SS') AS D FROM DUAL`,
  [],
  { outFormat: oracledb.OUT_FORMAT_OBJECT }
);

console.log('query completed');

const result_string = JSON.stringify(await result);

app.get('/', (req, res) => {
  res.send(`Date from DB Query is ${result_string}!`);
});

app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});

console.log(result);
 } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
run();

//app.get('/', (req, res) => {
//  res.send(`Date from DB Query is ${result}!`);
//});
	
