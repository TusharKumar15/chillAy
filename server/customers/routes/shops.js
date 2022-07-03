import express from 'express';
import { postShops, getShops, myOrders, getMenufromId, postMenufromId, postOrders } from '../controllers/shops.js';
import { validJWT, checkUser } from '../middleware.js';

const router = express.Router();

router.get('/eateries', validJWT, checkUser, getShops);
router.post('/eateries', postShops);
router.get('/eateries/menu/:shop_id', getMenufromId);
router.post('/eateries/menu/:shop_id', postMenufromId);
router.get('/myOrders', validJWT, checkUser, myOrders);
router.post('/your_orders', postOrders);

export default router;