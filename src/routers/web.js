const express = require("express");
const router = express.Router();
const TestController = require('../apps/controllers/test')
const ProductController = require('../apps/controllers/product')
const PositionController = require('../apps/controllers/position')
const AdminController = require('../apps/controllers/admin')
const UploadMiddleware = require('../apps/middlewares/Upload')
const UserController = require('../apps/controllers/user')
const SiteController = require('../apps/controllers/site')
const RecController = require('../apps/controllers/reg')
const CartController = require('../apps/controllers/cart')
const ProductModel = require('../apps/models/product')

router.get('/',(req,res)=>{
    return res.send('hello'),
})
router.get('/test1',TestController.test1);
//dashboard
router.get('/admin',AdminController.index);
//products
router.get('/product',ProductController.index);
router.get("/create",ProductController.create);
router.post('/store',UploadMiddleware.upload.fields([
    {name:'thumbnail',maxCount:1},
    {name:'second_img',maxCount:1},
    {name:'third_img',maxCount:1},
]),ProductController.store);
router.get('/delete/:id',ProductController.del)
router.get('/edit/:id',ProductController.edit),
router.post('/update/:id',UploadMiddleware.upload.fields([
    {name:'thumbnail',maxCount:1},
    {name:'second_img',maxCount:1},
    {name:'third_img',maxCount:1},
]),ProductController.update),
// end_prd


//users
router.get('/user',UserController.index);
router.get('/create_user',UserController.create);
router.post('/list_user',UserController.list_user);
router.get('/del_user/:id',UserController.del);
router.get('/edit_user/:id',UserController.edit);
router.post('/update_user/:id',UserController.update);

//position
router.get('/position',PositionController.index);
router.get('/create_position',PositionController.create);
router.post('/list_pos',PositionController.list_pos);
router.get('/del_pos/:id',PositionController.del);

//recruit
router.get('/recruit',RecController.index);
router.get('/del_recruit/:id',RecController.del);


//cart
router.get('/item',CartController.index);
router.get('/cart_order/:id',CartController.order);
router.get('/del_cart/:id',CartController.del_cart);

//site.
router.get('/site/index',SiteController.index);
router.get('/site/product-:slug.:id',SiteController.product)
router.get('/site/recruit',SiteController.recruit)
router.get('/site/sign/:id',SiteController.sign);
router.post('/addToSs',SiteController.addToSs);
router.get('/site/success',SiteController.success);
router.post('/site/add-to-cart',SiteController.addToCart);
router.post('/update_cart',SiteController.updateCart);
router.get("/del-cart-:id",SiteController.del_cart);
router.post('/site/addcart',SiteController.addCart);
router.get('/cart',SiteController.cart);
router.get('/category-:slug.:id',SiteController.category)
router.get('/build-case',SiteController.buildCase)
router.post("/order",SiteController.order);
router.get('/success',SiteController.success);
router.get('/mail',SiteController.mail);
router.get('/category-:slug.:cat_id/brand.:bra_id',SiteController.brand);
router.get('/search',SiteController.search);
router.get('/category-:slug.:cat_id/type.:typ_id',SiteController.type);
router.get('/category-:slug.:cat_id/price.:pri_id',SiteController.price);
router.get('/pick',SiteController.pick);

router.get('/json', async (req,res)=>{
    const product = await ProductModel.find().populate([{path: 'category'}]);
    return res.json(product);
})
router.post('/json',async (req,res)=>{
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    return res.json({product:newProduct});
})
module.exports = router;
