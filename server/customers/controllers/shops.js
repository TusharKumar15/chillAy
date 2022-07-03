import shopMessage from '../../bussiness/models/addShop.js'
import itemMessage from '../../bussiness/models/editItems.js';
import orderMessage from '../../bussiness/models/editOrders.js';

export const getShops = (req, res) => {
    
};

export const postShops = async (req, res) => {
    const shops = await shopMessage.find();
    res.json(shops);
};

export const myOrders = (req, res) => {
    // res.send('Here a list of your orders will be displayed');
    console.log("myOrders called");
};

export const getMenufromId = async (req, res) => {
    const shop = await shopMessage.findById({'_id': req.params['shop_id']});
    res.json(await itemMessage.find({'shopID': shop.bussinessID}));
}

export const postMenufromId = async (req, res) => {
    
    const {customerID, shopID, orders, totalAmount} = req.body;   
    const order = await orderMessage.create({customerID, shopID, orders, totalAmount});
    res.json();
}

export const postOrders = async (req, res) => {
    const { customerID } = req.body;
    const order = await orderMessage.find({customerID: customerID});
    res.json(order);
}