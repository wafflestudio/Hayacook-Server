var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');
var user = require('../controllers/user');
var recipe = require('../controllers/recipe');
var item = require('../controllers/item');

router.get('/', function (req, res) {
	res.json({message: 'working!'});
});

// Recipe
//router.post('/recipe', auth.verifyAdmin, recipe.create);
router.get('/recipe', recipe.read);
//router.get('/item/list', item.list);
//router.put('/recipe/:id', auth.verifyAdmin, recipe.update);
//router.delete('/recipe/:id', auth.verifyAdmin, recipe.delete);
//router.post('/recipe/search', recipe.search);

// Item
/*
router.post('/item', auth.verifyAdmin, item.create);
router.get('/item', recipe.read);
router.put('/item', recipe.update);
router.delete('/item', recipe.delete);
*/

// 유저
router.post('/admin/user/list', auth.verifyAdmin, user.read);
router.post('/user', user.create);
router.get('/user/me', auth.verify, user.me);


module.exports = router;