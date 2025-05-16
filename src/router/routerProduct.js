const express = require('express');
const router = express.Router();

const {createProduct, getAllProducts, getProductsById, updateProducts, deleteProducts} = require('../controller/products.js');
const upload = require('../middleware/uploadProduct.js');

router.post('/createProduct', upload.single("image"), createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getProduct/:id', getProductsById);
router.put('/updateProducts/:id', upload.single("image"), updateProducts);
router.delete('/deleteProducts/:id', deleteProducts);

module.exports = router;