var express = require('express');
var router = express.Router();

var indexController = require('../controllers/index-controller');

router.route('/')
  .get((...args) => indexController.index(...args));

router.route('/search')
  .post((...args) => indexController.search(...args));

router.route('/search/:name/:page')
  .get((...args) => indexController.searchPage(...args));

router.route('/next-page/:id')
  .get((...args) => indexController.nextPage(...args));

router.route('/more-info/:id')
  .get((...args) => indexController.moreInfo(...args));

router.route('/json')
  .get((...args) => indexController.json(...args));

router.route('/json/:id')
  .get((...args) => indexController.jsonInfo(...args));

module.exports = router;
