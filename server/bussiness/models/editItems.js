import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    shopID: {
        type: String,
        required: true
    }
});

const itemMessage = mongoose.model('ItemSchema', itemSchema);

export default itemMessage;

