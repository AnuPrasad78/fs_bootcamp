import express from 'express';

import { getAllPrdt,getPdtById,createPdt,updatePdt,deleteProduct } from '../controllers/productController.js';

const router=express.Router();
router.get('/',getAllPrdt)
router.get('/:id',getPdtById)
router.post('/',createPdt)
router.put('/:id',updatePdt)
router.delete('/:id',deleteProduct)

export default router;