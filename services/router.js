// routing configuration
// url suffix of /api/oratest as router is mounted under /api in services/web-server.js

const express = require('express');
const router = new express.Router();
const currentdatetime = require('../controllers/currentdatetime.js');

router.route('/oratest')
  .get(currentdatetime.get);

module.exports = router;
