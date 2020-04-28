const {Router}= require('express')
const  {getProducts, getProduct, addProducts, updateProducts, deleteProducts}  = require('../controllers/productController')
const router =Router()

router.get('/products', getProducts);
router.get('/products/:id', getProduct)
router.post('/products', addProducts)
router.patch('/products/:id', updateProducts)
router.delete('/products/:id', deleteProducts)

module.exports = router
