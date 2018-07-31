const express = require('express');
const router = express.Router();
const knex = require('../db');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await knex.select().table('person');
  res.json(users);
});

module.exports = router;
