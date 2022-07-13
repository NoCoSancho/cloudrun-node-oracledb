// handles get requests for oratest
const currentdatetime = require('../db_apis/oracle-date-time.js');

async function get(req, res, next) {
  try {

    const rows = await currentdatetime.getcurrentdatetime();

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;
