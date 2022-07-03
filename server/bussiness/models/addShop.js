import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';

const shopSchema = mongoose.Schema({
    shopName: {
        type: String,
        required: [true, 'Please enter an name']
    }, 
    shopStatus: {
        type: Boolean,
        default: false,
    },

    bussinessID: {
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

shopSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

shopSchema.statics.login = async function(bussinessID, password){
    const shop = await this.findOne({bussinessID});
    if(shop){
        const auth = await bcrypt.compare(password, shop.password);
        if(auth){
            return shop;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect Email');
}


const shopMessage = mongoose.model('shopSchema', shopSchema);

export default shopMessage;