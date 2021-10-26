const ProductModel = require('../models/product');
const CategoryModel = require('../models/category');
const UserModel = require('../models/user');
const CartModel = require('../models/cart');

const index = async (req,res)=>{
    const users = await UserModel.find();
    const totalUser = users.length;
    const products = await ProductModel.find();
    const totalProduct = products.length;
    const categories = await CategoryModel.find();
    const totalCategory = categories.length;
    const carts = await CartModel.find();
    const totalCart = carts.length;
    res.render('admin/dashboard',{
        totalProduct: totalProduct,
        totalCategory:totalCategory,
        totalUser:totalUser,
        totalCart:totalCart,
    })
}
module.exports ={
    index:index,
}
