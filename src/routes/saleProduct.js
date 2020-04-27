const {Router}= require('express')
const  {getSaleProducts, addSaleProducts, updateSaleProducts, deleteSaleProducts} = require('../controllers/saleProductController')
const router =Router()

router.get('/saleproducts', getSaleProducts);
router.post('/saleproducts', addSaleProducts);
router.patch('/saleproducts/:id', updateSaleProducts);
router.delete('/saleproducts/:id', deleteSaleProducts);

module.exports = router
