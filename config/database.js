// db connection pool configuration
// variables passed in for connection string
// connection pool min/max/increment are static
// "oraPool" is referenced in other .js files

module.exports = {
  oraPool: {
    user: process.env.NODE_ORACLEDB_USER,
    password: process.env.NODE_ORACLEDB_PASSWORD,
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};
