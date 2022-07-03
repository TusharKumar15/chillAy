import express from 'express';
import { getOrders, getMenu, postMenu, postOrders } from '../controllers/orders.js';
import { validJWT, checkUser } from '../middleware.js';

const router = express.Router();

router.get('/orders', validJWT, checkUser, getOrders);
router.post('/orders', postOrders);
router.get('/food_menu',validJWT, checkUser, getMenu);
router.post('/food_menu', postMenu);

export default router;