import customerMessage from "../models/addCustomer.js";
import jwt from "jsonwebtoken";

//handle errors
const hanldleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {customerName: '', customerID: '', password: ''};
    
    if(err.code === 11000) {
        errors.customerID = 'Email already registered';
        return errors;
    }
    
    if(err.message.includes('customerSchema validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    }
}

const hanldleErrorsLogin = (err) => {
    console.log(err.message, err.code);
    let errors = {bussinessID: '', password: ''};
    if(err.message === 'incorrect Email'){
        errors.bussinessID = 'This email does not exist'
    }
    else if(err.message === 'incorrect password'){
        errors.password = 'wrong password';
    }
    return errors;
}

const createToken = (id) => {
    return jwt.sign({id}, 'chillay secret');
}

const get_customer_signup = (req, res) => {
    // res.send('signup');
}

const post_customer_signup = async (req, res) => {
    // console.log(req.body);
    const {customerName, customerID, password} = req.body; 
    try{
        const newCustomer = await customerMessage.create({customerName, customerID, password});
        const token = createToken(newCustomer._id);
        res.cookie('jwt', token);
        res.status(201).json({newCustomer});
    }
    catch(err){
        const errors = hanldleErrors(err);
        res.status(400).json({errors});
    }
}

const get_customer_login = (req, res) => {
    // res.send('login');
}

const post_customer_login = async (req, res) => {
    // console.log(req.body);
    const {customerID, password} = req.body; 
    try{
        const customer = await customerMessage.login(customerID, password);
        const token = createToken(customer._id);
        res.cookie('jwt', token);
        res.status(200).json({customer});
    }
    catch(err) {
        const errors = hanldleErrorsLogin(err);
        res.status(400).json({errors});
    }
}

export {get_customer_login, get_customer_signup, post_customer_signup, post_customer_login};