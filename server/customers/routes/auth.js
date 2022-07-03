import express from 'express';
import { get_customer_login, get_customer_signup, post_customer_signup, post_customer_login } from '../controllers/auth.js';

const router = express.Router();

router.get('/customer_signup', get_customer_signup);
router.post('/customer_signup', post_customer_signup);
router.get('/customer_login', get_customer_login);
router.post('/customer_login', post_customer_login);

export default router;