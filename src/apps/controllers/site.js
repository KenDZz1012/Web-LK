const CategoryModel = require('../models/category');
const ProductModel = require('../models/product');
const PositionModel = require('../models/position');
const RegModel = require('../models/reg');
const CartModel = require('../models/cart');
const BrandModel = require('../models/brand');
const TypeModel = require('../models/type');
const PriceModel = require('../models/price');
const path = require("path");
const ejs = require("ejs")
const transporter = require("../../common/transporter");
const paginate = require('../../common/paginate');


const index= async(req,res)=>{
    const categories = await CategoryModel.find();
    const brand_laptop = await BrandModel.find({
        'title':['Asus','Acer','MSI','DELL'],
    });
    const brand_vga = await BrandModel.find({
        'title':['Asus','GIGABYTE','MSI','PALIT','AORUS'],
    })
    const brand_main = await BrandModel.find({
        'title':['Asus','GIGABYTE','MSI'],
    })
    const brand_cpu = await BrandModel.find({
        'title':['INTEL','AMD'],
    })
    const brand_ram = await BrandModel.find({
        'title':['CORSAIR','KINGSTON','ADATA','APACER','GSKILL'],
    })
    const brand_psu = await BrandModel.find({
        'title':['Asus','CORSAIR','GIGABYTE','Cooler Master'],
    })
    const brand_oc = await BrandModel.find({
        'title':['HDD','SSD'],
    })
    const brand_kb = await BrandModel.find({
        'title':['RAZER','Logitech','CORSAIR','Fuhlen','STEELSERIES','Cooler Master'],
    })
    const brand_mouse = await BrandModel.find({
        'title':['Asus','RAZER','Logitech','CORSAIR','Fuhlen','STEELSERIES'],
    })
    const brand_screen = await BrandModel.find({
        'title':['Asus','DELL','HP','SamSung','LG','GIGABYTE','MSI'],
    })
    const brand_case = await BrandModel.find({
        'title':['Asus','GIGABYTE','MSI','CORSAIR','NZXT','Cooler Master'],
    })
    const brand_hp = await BrandModel.find({
        'title':['RAZER','STEELSERIES','CORSAIR','Logitech','Dare-u'],
    })
    console.log(brand_laptop);
    let laptop_id;
    let screen_id;
    let case_id;
    let mouse_id;
    let kb_id;
    for(let i =0;i<categories.length;i++)
    {
        if(categories[i].title == 'LAPTOP')
        {
            laptop_id = categories[i].id;
        }
        if(categories[i].title == 'MÀN HÌNH')
        {
            screen_id = categories[i].id;
        }
        if(categories[i].title == 'CASE')
        {
            case_id = categories[i].id;
        }
        if(categories[i].title == 'CHUỘT')
        {
            mouse_id = categories[i].id;
        }
        if(categories[i].title == 'BÀN PHÍM')
        {
            kb_id = categories[i].id;
        }
    }
    const screens = await ProductModel.find({
        is_stock:true,
        cat_id:screen_id,
        featured: true,
    })
    const laptops = await ProductModel.find({
        is_stock:true,
        cat_id:laptop_id,
        featured: true,
    })
    const cases = await ProductModel.find({
        is_stock:true,
        cat_id:case_id,
        featured: true,
    })
    const mouse = await ProductModel.find({
        is_stock:true,
        cat_id:mouse_id,
        featured:true,
    })
    const kb = await ProductModel.find({
        is_stock:true,
        cat_id:kb_id,
        featured:true,
    })
    res.render('site/index',{
        categories:categories,
        laptops:laptops,
        screens:screens,
        cases:cases,
        mouse:mouse,
        kb:kb,
        brand_laptop,
        brand_vga,
        brand_main,
        brand_psu,
        brand_cpu,
        brand_ram,
        brand_oc,
        brand_kb,
        brand_mouse,
        brand_screen,
        brand_case,
        brand_hp,
    })
}


const product = async(req,res)=>{
    const id = req.params.id;
    const slug = req.params.slug;
    const product = await ProductModel.findById(id);
    const relative = await ProductModel.find({
        _id:{$nin : [id]},
        cat_id:product.cat_id,
        bra_id:product.bra_id,
    })
    console.log(product.cat_id.brand);
    res.render('site/product',{
        product:product,
        relative:relative,
    })
}
const recruit = async(req,res)=>{
    const positions = await PositionModel.find();
    res.render('site/recruitment',{
        positions:positions,
    })
}
const sign = async(req,res)=>{
    const id = req.params.id;
    const position = await PositionModel.findById(id);
    res.render('site/reg',{
        position:position,
    })
}

const addToSs = async (req, res)=>{
    const body = req.body;
    console.log(body.name);
    const form ={
        name:body.name,
        pos_id:body.pos_id,
        gender:body.gender,
        birth:body.birth,
        adress:body.adress,
        description:body.description,
        sdt:body.sdt,
        email:body.email,
    };
    new RegModel(form).save();
    console.log(form);
    res.redirect('site/success');
}
const success = async(req, res)=>{
    res.render('site/success')
}
const addToCart = async(req,res)=>{
    const body = req.body;
    const items = req.session.cart;
    let isUpdate = false;
    items.map((item)=>{
        if(body.id == item.id)
        {
            isUpdate = true;
            item.qty += parseInt(body.qty);
        }
        return item;
    })
    if(!isUpdate)
    {
        const product = await ProductModel.findById(body.id);
        console.log(body.id);
        items.push({
            id:product._id,
            name:product.name,
            price:product.price,
            qty:parseInt(body.qty),
            thumbnail:product.thumbnail,
        })
    }
    req.session.cart = items;
    res.redirect('/cart')
}
const cart = async (req, res) => {
    const products = req.session.cart;
    res.render('site/cart',{
        products: products,
        totalPrice:0,
    })
}
const updateCart = async(req, res) => {
    const products = req.body.products;
    const items = req.session.cart;
    items.map((item=>{
        if(products[item.id])
        {
            item.qty = parseInt(products[item.id]['qty']);
        }
        return item;
    }))
    req.session.cart = items;
    res.redirect("/cart");
}
const del_cart = async (req,res)=>{
    const id = req.params.id;
    const items = req.session.cart;
    items.map((item,key)=>{
        if(item.id === id){
            items.splice(key,1);
        }
        return item;
    });
    req.session.cart= items;
    res.redirect("/cart");
}



const category = async(req, res) => {
    const slug = req.params.slug;
    const id = req.params.id;
    const category = await CategoryModel.findById(id);
    const products = await ProductModel.find({'cat_id':id}).sort({id:-1});
    const title = category.slug;
    const cat_id = category.id;
    const total = products.length;
    console.log(products);
    res.render('site/category',{
        category:category,
        products:products,
        title:title,
        cat_id:cat_id,
    })
}

const brand = async(req,res)=>{
    const slug = req.params.slug;
    const cat_id = req.params.cat_id;
    const bra_id = req.params.bra_id;
    const category = await CategoryModel.findById(cat_id);
    const title = category.slug;
    const brand = await BrandModel.findById(bra_id);
    const cat_title = category.slug;
    const bra_title = brand.title
    const products = await ProductModel.find({'cat_id':cat_id,'bra_id':bra_id}).sort({id:-1});
    console.log(products);
    res.render('site/brand',{
        category:category,
        products:products,
        brand:brand,
        cat_title:cat_title,
        bra_title:bra_title,
        title:title,
    })

}

const type = async(req,res)=>{
    const slug = req.params.slug;
    const cat_id = req.params.cat_id;
    const typ_id = req.params.typ_id;
    const category = await CategoryModel.findById(cat_id);
    const title = category.slug;
    const type = await TypeModel.findById(typ_id);
    const cat_title = category.slug;
    const typ_title = type.title;
    console.log(typ_id);
    const products = await ProductModel.find({'cat_id':cat_id,'typ_id':typ_id}).sort({id:-1});
    res.render('site/type',{
        category:category,
        products:products,
        type:type,
        cat_title:cat_title,
        typ_title:typ_title,
        title:title,
    })
}

const price = async(req,res)=>{
    const slug = req.params.slug;
    const cat_id = req.params.cat_id;
    const pri_id = req.params.pri_id;
    const category = await CategoryModel.findById(cat_id);
    const title = category.slug;
    const price = await PriceModel.findById(pri_id);
    const products = await ProductModel.find({'cat_id':cat_id,'pri_id':pri_id}).sort({id:-1});
    res.render('site/price',{
        category:category,
        products:products,
        title:title,
    })
}
const pick = async(req, res)=>{
    const brands = await BrandModel.find();
    const prices = await PriceModel.find();
    let brand_title = req.query.brand||'';
    const price_title = req.query.price||'';
    const cat_id = req.query.cat_id;
    const category = await CategoryModel.findById(cat_id);
    const title = category.slug;
    let bra_id;
    let pri_id;
    for(let i = 0;i<brands.length;i++){
        if(brands[i].title == brand_title){
            bra_id = brands[i].id;
        }
    }
    for(let i = 0;i<prices.length;i++){
        if(prices[i].title == price_title){
            pri_id = prices[i].id;
        }
    }
    console.log(cat_id);
    console.log(bra_id);
    console.log(pri_id);
    let products;
    if(bra_id && pri_id&&cat_id)
    {
        products = await ProductModel.find({'cat_id':cat_id,'bra_id':bra_id,'pri_id':pri_id})
    }
    else if(bra_id&&cat_id)
    {
        products = await ProductModel.find({'cat_id':cat_id,'bra_id':bra_id})
    }
    else if(pri_id && cat_id)
    {
         products = await ProductModel.find({'cat_id':cat_id,'pri_id':pri_id})
    }
    res.render('site/category',{
        products:products,
        title:title,
        cat_id : cat_id,
    })
}





const buildCase = async(req,res)=>{
    const categories = await CategoryModel.find();
    let vga_id;
    let screen_id;
    let case_id;
    let main_id;
    let psu_id;
    let cpu_id;
    let ram_id;
    for(let i =0;i<categories.length;i++)
    {
        if(categories[i].title == 'VGA')
        {
            vga_id = categories[i].id;
        }
        if(categories[i].title == 'MÀN HÌNH')
        {
            screen_id = categories[i].id;
        }
        if(categories[i].title == 'CASE')
        {
            case_id = categories[i].id;
        }
        if(categories[i].title == 'RAM')
        {
            ram_id = categories[i].id;
        }
        if(categories[i].title == 'CPU')
        {
            cpu_id = categories[i].id;
        }
        if(categories[i].title == 'PSU')
        {
            psu_id = categories[i].id;
        }
        if(categories[i].title == 'MAINBOARD')
        {
            main_id = categories[i].id;
        }
    }
    const vgas = await ProductModel.find({
        is_stock:true,
        cat_id:vga_id,
        // featured: true,
    })
    const screens = await ProductModel.find({
        is_stock:true,
        cat_id:screen_id,
        // featured: true,
    })
    const cases = await ProductModel.find({
        is_stock:true,
        cat_id:case_id,
        // featured: true,
    })
    const rams = await ProductModel.find({
        is_stock:true,
        cat_id:ram_id,
        // featured: true,
    })
    const mains = await ProductModel.find({
        is_stock:true,
        cat_id:main_id,
        // featured: true,
    })
    const cpus = await ProductModel.find({
        is_stock:true,
        cat_id:cpu_id,
        // featured: true,
    })
    const psus = await ProductModel.find({
        is_stock:true,
        cat_id:psu_id,
        // featured: true,
    })
    res.render('site/buildCase',{
        vgas:vgas,
        screens:screens,
        cases:cases,
        mains:mains,
        cpus:cpus,
        psus:psus,
        rams:rams,
    })
}

const addCart = async(req,res)=>{
    const body = req.body;
    const items = req.session.cart;
    let isUpdate = false;
    items.map((item)=>{
        if(body.case_id == item.id)
        {
            isUpdate = true;
            item.qty += 1;
        }
        if(body.main_id == item.id)
        {
            isUpdate = true;
            item.qty += 1;
        }
        if(body.vga_id == item.id)
        {
            isUpdate = true;
            item.qty += 1;
        }
        if(body.ram_id == item.id)
        {
            isUpdate = true;
            item.qty += 1;
        }
        if(body.cpu_id == item.id)
        {
            isUpdate = true;
            item.qty += 1;
        }
        if(body.psu_id == item.id)
        {
            isUpdate = true;
            item.qty += 1;
        }
        if(body.screen_id == item.id)
        {
            isUpdate = true;
            item.qty += 1;
        }
        return item;
    })
    if(!isUpdate)
    {
        const product_case = await ProductModel.findById(body.case_id);
        const product_main = await ProductModel.findById(body.main_id);
        const product_cpu = await ProductModel.findById(body.cpu_id);
        const product_vga = await ProductModel.findById(body.vga_id);
        const product_psu = await ProductModel.findById(body.psu_id);
        const product_screen = await ProductModel.findById(body.screen_id);
        const product_ram = await ProductModel.findById(body.ram_id);

        console.log(product);
        items.push({
            id:product_case._id,
            name:product_case.name,
            price:product_case.price,
            qty:1,
            thumbnail:product_case.thumbnail,
        },
        {
            id:product_main._id,
            name:product_main.name,
            price:product_main.price,
            qty:1,
            thumbnail:product_main.thumbnail,
        },
        {
            id:product_cpu._id,
            name:product_cpu.name,
            price:product_cpu.price,
            qty:1,
            thumbnail:product_cpu.thumbnail,
        },
        {
            id:product_vga._id,
            name:product_vga.name,
            price:product_vga.price,
            qty:1,
            thumbnail:product_vga.thumbnail,
        },
        {
            id:product_psu._id,
            name:product_psu.name,
            price:product_psu.price,
            qty:1,
            thumbnail:product_psu.thumbnail,
        },
        {
            id:product_screen._id,
            name:product_screen.name,
            price:product_screen.price,
            qty:1,
            thumbnail:product_screen.thumbnail,
        },
        {
            id:product_ram._id,
            name:product_ram.name,
            price:product_ram.price,
            qty:1,
            thumbnail:product_ram.thumbnail,
        },
        )
    }
    req.session.cart = items;
    res.redirect('/cart')
}
const order = async(req, res) => {
    const body = req.body;
    const items=  req.session.cart;
    const viewPath = req.app.get('views');
    const html = await ejs.renderFile(
        path.join(viewPath,'site/mail.ejs'),
        {
            name:body.name,
            phone: body.phone,
            mail: body.mail,
            add: body.add,
            totalPrice: 0,
            items,
        }
    )
    const cart = {
        name:body.name,
        sdt:body.phone,
        email:body.mail,
        add:body.add,
        items, 
    }
    new CartModel(cart).save();
    req.session.cart = [];
    res.redirect("/success");
}
const mail = async(req,res)=>{
    res.render('site/mail');
}
const search = async (req, res)=>{
    const keyword = req.query.keyword || "";
    const products = await ProductModel.find({
            name:{
                $regex: keyword,
                $options: '$is'
            }
    }).then(products => {
        res.render("site/search", {keyword, products});
    })
}



module.exports={
    index: index,
    product:product,
    recruit:recruit,
    sign:sign,
    addToSs:addToSs,
    success:success,
    addToCart:addToCart,
    updateCart:updateCart,
    del_cart:del_cart,
    cart:cart,
    category:category,
    buildCase:buildCase,
    addCart:addCart,
    order:order,
    mail:mail,
    brand:brand,
    search:search,
    type:type,
    price:price,
    pick:pick,
}