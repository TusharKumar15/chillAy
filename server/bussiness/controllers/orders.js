import itemMessage from "../models/editItems.js";
import orderMessage from "../models/editOrders.js";

const hanldleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {itemName: '', price: ''};

    if(err.message.includes('itemSchema validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    }
}

export const getOrders = (req, res) => {
    // res.send('Here a list of orders placed in the shop will be displayed');
    
};

export const postOrders = async (req, res) => {
    const { shopID, _id } = req.body;
    if(_id){
        await orderMessage.findByIdAndDelete(_id);
        const order = await orderMessage.find({shopID: shopID});
        res.json(order);
    }
    else {
        const order = await orderMessage.find({shopID: shopID});
        res.json(order);
    }
    
}

export const getMenu = (req, res) => {
    // console.log(req.body);
    
};

export const postMenu = async (req, res) => {
    const {itemName, price, shopID, _id} = req.body;
    if(itemName || price){
        try{
            await itemMessage.create({itemName, price, shopID});
            const list = await itemMessage.find({'shopID': shopID});
            res.json(list);
        }
        catch(err){
            const errors = hanldleErrors(err);
            res.status(400).json({ errors });
        }
    }
    else if(shopID && !_id) {
        // res.json(shopID);
        const list = await itemMessage.find({'shopID': shopID});
        res.json(list);
    }
    else {
        await itemMessage.deleteOne({'_id': _id});
        res.status(200).json(await itemMessage.find({'shopID': shopID}));
    }
}