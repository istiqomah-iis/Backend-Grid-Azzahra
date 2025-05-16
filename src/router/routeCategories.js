const express = require('express');
const router  = express.Router();

const {createCategories, getAllCategories, getCategoriesById, updateCategories, deleteCategories} = require('../controller/categories.js');

router.post('/createCategories', createCategories);
router.get('/getAllCategori', getAllCategories);
router.get('/getCategories/:id', getCategoriesById);
router.put('/updateCategori/:id', updateCategories);
router.delete('/deleteCategori/:id', deleteCategories);
module.exports = router;