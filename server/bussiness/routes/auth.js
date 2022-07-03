import express from 'express';
import { get_bussiness_login, get_bussiness_signup, post_bussiness_signup, post_bussiness_login, logout } from '../controllers/auth.js';

const router = express.Router();

router.get('/business_signup', get_bussiness_signup);
router.post('/business_signup', post_bussiness_signup);
router.get('/', get_bussiness_login);
router.post('/', post_bussiness_login);
router.get('/logout', logout);
// router.get('/test', (req, res) => res.send('this is a test route'));

export default router;