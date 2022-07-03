import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    customerID: {
        type: String,
        required: true
    },
    shopID: {
        type: String,
        required: true
    }, 
    orders: [{
        itemName: String,
        itemPrice: Number,
        quantity: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
});

// export const customerOrderMessage = mongoose.model('customerOrderSchema', customerOrderSchema);
const orderMessage = mongoose.model('orderSchema', orderSchema);

export default orderMessage;