const CartModel = require('../models/cart');
const ProductModel = require('../models/product')

const index = async(req,res)=>{
    const cart = await CartModel.find().sort({id:-1});
    res.render('admin/cart/cart',{
        cart:cart,
    });
}

const order = async(req,res)=>{
    const id = req.params.id;
    const cart = await CartModel.findById(id);
    console.log(cart.items);
    const items = cart.items;
    res.render('admin/cart/order',{
        cart,
        items,
        totalPrice:0,
    })
}

const del_cart = async(req,res)=>{
    const id = req.params.id;
    const cart = await CartModel.findById(id);
    console.log(cart.items);
    const items = cart.items;
    for(let i=0; i<items.length; i++)
    {
        const prd_id = items[i].id;
        const product = await ProductModel.findById(prd_id);
        let quantity = product.quantity;
        console.log(quantity);
        console.log(product);
        quantity = parseInt(quantity - items[i].qty);
        console.log(items[i].qty);
        console.log(quantity);
        const prd = {
            quantity : quantity,
        }
        await ProductModel.updateOne({_id : prd_id} , {$set : prd});
        await CartModel.deleteOne({_id:id});
        res.redirect('/item');
    }
}

module.exports={
    index:index,
    order:order,
    del_cart:del_cart,
}