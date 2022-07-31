const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const detailController = require('../controllers/detail');
const listController = require('../controllers/list');
const categoryController = require('../controllers/category')

router.get('/home', homeController.home);
router.get('/detail/:id', detailController.detail);
router.get('/chapter/:id/:id_chapter', detailController.chapter);
router.get('/list/:type/:page', listController.list);
router.get('/project/:page', listController.project);
router.get('/completed/:page', listController.completed);
router.get('/genres', categoryController.genres);
router.get('/genres/:id/:page', categoryController.genre_list);
router.get('/releases/:id/:page', categoryController.releases);


module.exports = router