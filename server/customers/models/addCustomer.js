import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';

const customerSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Please enter an name']
    },
    customerID: {
        type: String,
        reqired: [true, 'email required'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        reqired: [true, 'password required'],
        minlength: [6, 'Enter atleat 6 characters'],
    }
});

customerSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

customerSchema.statics.login = async function(customerID, password){
    const customer = await this.findOne({customerID});
    if(customer){
        const auth = await bcrypt.compare(password, customer.password);
        if(auth){
            return customer;
        }
        throw Error('incorrect password');

    }
    throw Error('incorrect Email');
}

const customerMessage = mongoose.model('customerSchema', customerSchema);

export default customerMessage;