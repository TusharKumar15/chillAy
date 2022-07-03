import jwt from 'jsonwebtoken';
import shopMessage from './models/addShop.js';

export const validJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'chillay secret', (err, decodedToken) => {
            if(err){
                console.log(err.message);
            }
            else {
                next();
            }
        })
    }
    else {
        console.log('no token');
    }
}

export const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'chillay secret', async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                const user = await shopMessage.findById(decodedToken.id);
                res.locals.user = user;
                res.json({user});
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}