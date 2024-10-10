const express = require('express');
const router = express.Router();

const Controller = require('../controller/controller');

router.route('/').get(Controller.getData);
router.route('/item/:id').get(Controller.getItemData);

module.exports = router;


