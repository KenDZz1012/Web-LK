const ProductModel = require('../models/product');
const CategoryModel = require('../models/category');
const BrandModel =  require('../models/brand');
const PriceModel = require('../models/price');
const TypeModel = require('../models/type');
const fs = require("fs");
const path = require("path");
const slug = require('slug');
const paginate = require('../../common/paginate');


const index = async(req,res)=>{
    const page= parseInt(req.query.page)||1;//trang hiện tại hoặc trang đầu
    const limit = parseInt(req.query.limit)||10;//số prd tối đa
    const skip = limit*(page-1);//skip số prd
    const total = await ProductModel.find().countDocuments();
    const totalPage = Math.ceil(total/limit);//tổng trang
    const products = await ProductModel.find().populate({path:'cat_id'}).skip(skip).limit(limit).sort({_id:-1});
    const category = await CategoryModel.find();
    res.render("admin/products/product",{
        totalPage:totalPage,
        pages:paginate(page,totalPage),
        page: page,
        products: products,
        category:category,
    });
}
const create = async (req, res) => {
    const category = await CategoryModel.find();
    const brand = await BrandModel.find();
    const price = await PriceModel.find();
    const type = await TypeModel.find();
    res.render("admin/products/add_product", { category: category,brand:brand,price:price,type:type})
}
const store = async (req, res) => {
    const body = req.body;
    const files = req.files;
    const prd={
        description: body.description,
        price: body.price,
        cat_id: body.cat_id,
        bra_id:body.bra_id,
        pri_id:body.pri_id,
        typ_id: body.typ_id,
        status: body.status,
        quantity:body.quantity,
        featured: body.featured === "on",
        promotion: body.promotion,
        warranty: body.warranty,
        accessories: body.accessories,
        is_stock: body.is_stock,
        name: body.name,
        slug: slug(body.name),
    };
    if(files['thumbnail']){
        prd["thumbnail"] = "product/"+files['thumbnail'][0].originalname;
        fs.renameSync(files['thumbnail' ][0].path, path.resolve("src/public/images", "product/"+files['thumbnail'][0].originalname));
    }
    if(files["second_img"]){
        prd["second_img"] = "product/"+files['second_img'][0].originalname;
        fs.renameSync(files['second_img' ][0].path, path.resolve("src/public/images", "product/"+files['second_img'][0].originalname));
    }
    if(files["third_img"]){
        prd["third_img"] = "product/"+files['third_img'][0].originalname;
        fs.renameSync(files['third_img' ][0].path, path.resolve("src/public/images", "product/"+files['third_img'][0].originalname));
    }
    new ProductModel(prd).save();
    res.redirect('/product');
}
const del = async (req, res) => {
    const id = req.params.id;
    await ProductModel.deleteOne({_id:id});
    res.redirect('/product');
}

const edit = async(req, res)=>{ 
    const id = req.params.id;
    const brand = await BrandModel.find();
    const prd = await ProductModel.findById(id);
    const category = await CategoryModel.find();
    res.render('admin/products/edit_product',{
        prd:prd,
        category:category,
        brand:brand,
    });
}

const update = async(req, res)=>{
    const body = req.body;
    const prd_id = req.params.id;
    const files = req.files;
    const prd = {
        description: body.description,
        price: body.price,
        cat_id: body.cat_id,
        bra_id:body.bra_id,
        quantity:body.quantity,
        status: body.status,
        featured: body.featured === "on",
        promotion: body.promotion,
        warranty: body.warranty,
        accessories: body.accessories,
        is_stock: body.is_stock,
        name: body.name,
        slug: slug(body.name),
    };
    if(files['thumbnail']){
        prd["thumbnail"] = "product/"+files['thumbnail'][0].originalname;
        fs.renameSync(files['thumbnail' ][0].path, path.resolve("src/public/images", "product/"+files['thumbnail'][0].originalname));
    }
    if(files["second_img"]){
        prd["second_img"] = "product/"+files['second_img'][0].originalname;
        fs.renameSync(files['second_img' ][0].path, path.resolve("src/public/images", "product/"+files['second_img'][0].originalname));
    }
    if(files["third_img"]){
        prd["third_img"] = "product/"+files['third_img'][0].originalname;
        fs.renameSync(files['third_img' ][0].path, path.resolve("src/public/images", "product/"+files['third_img'][0].originalname));
    }
    
    await ProductModel.updateOne({_id : prd_id} , {$set : prd});
    res.redirect("/product");
}

const search = async(req,res)=>{
    const keyword = req.query.keyword || "";
    const filter ={};
    if(keyword)
    {
        filter.$text = {$search: keyword}
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = limit * (page - 1); 
    const totals = await ProductModel.find().countDocuments();
    totalPage = Math.ceil(totals / limit); 
    const products = await ProductModel.find(filter).skip(skip).limit(limit).sort({id: -1});
    res.render("admin/products/search",
    {
        keyword,
        products,
        page: page,
        totalPage: totalPage,
        pages: paginate(page, totalPage),
    });
}




module.exports = {
    index:index,
    create:create,
    store:store,
    del:del,
    edit:edit,
    update,update,
    search:search,
}