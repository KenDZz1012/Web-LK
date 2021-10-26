const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const BrandModel = require("../models/brand");
const TypeModel = require("../models/type");
const PriceModel = require("../models/price");

module.exports = async (req,res,next) =>{
    res.locals.all_products = await ProductModel.find();
    res.locals.categories = await CategoryModel.find();
    res.locals.cat = await CategoryModel.find({
        'title':['LK PC','LAPTOP','MÀN HÌNH','TAI NGHE','BÀN PHÍM','CHUỘT']
    });
    res.locals.lk = await CategoryModel.find({
        'title':['VGA','MAINBOARD','CPU','RAM','PSU','Ổ CỨNG','CASE']
    })
    res.locals.brand_laptop = await BrandModel.find({
        'title':['Asus','Acer','MSI','LENOVO','DELL','HP'],
    });
    res.locals.brand_lap = await BrandModel.find({
        'title':['Asus','Acer','MSI','LENOVO','DELL','HP'],
    });
    res.locals.brand_vga = await BrandModel.find({
        'title':['Asus','GIGABYTE','MSI','PALIT','AORUS'],
    })
    res.locals.brand_main = await BrandModel.find({
        'title':['Asus','GIGABYTE','MSI'],
    })
    res.locals.brand_cpu = await BrandModel.find({
        'title':['INTEL','AMD'],
    })
    res.locals.brand_ram = await BrandModel.find({
        'title':['CORSAIR','KINGSTON','ADATA','APACER','GSKILL'],
    })
    res.locals.brand_psu = await BrandModel.find({
        'title':['Asus','CORSAIR','GIGABYTE','Cooler Master'],
    })
    res.locals.brand_oc = await BrandModel.find({
        'title':['HDD','SSD'],
    })
    res.locals.brand_kb = await BrandModel.find({
        'title':['RAZER','Logitech','CORSAIR','Fuhlen','STEELSERIES','Cooler Master'],
    })
    res.locals.brand_mouse = await BrandModel.find({
        'title':['Asus','RAZER','Logitech','CORSAIR','Fuhlen','STEELSERIES'],
    })
    res.locals.brand_screen = await BrandModel.find({
        'title':['Asus','DELL','HP','SamSung','LG','GIGABYTE','MSI'],
    })
    res.locals.brand_case = await BrandModel.find({
        'title':['Asus','GIGABYTE','MSI','CORSAIR','NZXT','Cooler Master'],
    })
    res.locals.brand_hp = await BrandModel.find({
        'title':['RAZER','STEELSERIES','CORSAIR','Logitech','Dare-u'],
    })
    res.locals.lap_asus = await TypeModel.find({
        'title':['Asus TUF Series','Asus ROG Series','Asus Zephyrus Series','Asus Vivobook Series','Asus Zenbook Series']
    })
    res.locals.lap_acer = await TypeModel.find({
        'title':['Acer Nitro Series','Acer Aspire Series','Acer Predator Series','Acer ConceptD Series']
    })
    res.locals.lap_msi = await TypeModel.find({
        'title':['MSI GE Series','MSI GS Series','MSI GF Series','MSI GL Series','MSI Modern Series','MSI Prestige Series','MSI Bravo Series']
    })
    res.locals.lap_dell = await TypeModel.find({
        'title':['Dell Inspiron Series','Dell Latitude Series','Dell Vostro Series','Dell XPS Series']
    })
    res.locals.pri_lap = await PriceModel.find({
        'title':['Dưới 20 triệu','Từ 20 -> 25 triệu','Từ 25 -> 30 triệu','Trên 30 triệu']
    })
    res.locals.vga_nvi = await TypeModel.find({
        'title':['VGA NVIDIA RTX 3090','VGA NVIDIA RTX 3080 Ti','VGA NVIDIA RTX 3080','VGA AMD RX 6900 XT','VGA AMD RX 6800 XT','VGA AMD RX 6800','VGA NVIDIA GTX 1660 Super']
    })
    res.locals.main = await TypeModel.find({
        'title':['Mainboard Intel H410','Mainboard Intel Z590','Mainboard Intel H510','Mainboard Intel B560','Mainboard AMD Ryzen A320','Mainboard AMD Ryzen B450','Mainboard AMD Ryzen B550','Mainboard AMD Ryzen X570']
    })
    res.locals.cpu = await TypeModel.find({
        'title':['CPU Intel Core i9','CPU Intel Core i7','CPU Intel Core i5','CPU Intel Core i3','CPU AMD Ryzen 9','CPU AMD Ryzen 7','CPU AMD Ryzen 5','CPU AMD Ryzen 3']
    })
    res.locals.ram = await TypeModel.find({
        'title':['RAM bus 1600','RAM bus 2666','RAM bus 2800','RAM bus 3000','RAM bus 3200','RAM bus 3600']
    })
    res.locals.psu = await TypeModel.find({
        'title':['Nguồn 300W -> 500W','Nguồn 550W -> 650W','Nguồn 700W -> 850W','Nguồn Trên 1000W']
    })
    res.locals.pri_kb = await PriceModel.find({
        'title' : ['Dưới 1 triệu','Từ 1 -> 2 triệu','Từ 2 -> 3 triệu','Từ 3 -> 4 triệu','Trên 4 triệu']
    })
    res.locals.pri_mouse = await PriceModel.find({
        'title' : ['Dưới 500 Nghìn','Từ 500 Nghìn -> 1 Triệu','Từ 1 -> 2 triệu','Từ 2 -> 3 triệu']
    })
    res.locals.pcgm = await TypeModel.find({
        'title': ['PC Gaming Cao Cấp','PC Gaming Trung Cấp','PC Gaming Phổ Thông']
    })
    res.locals.pcof = await TypeModel.find({
        'title': ['PC OFFICE Cao Cấp','PC OFFICE Trung Cấp','PC OFFICE Phổ Thông']
    })
    res.locals.pri_pc = await PriceModel.find({
        'title':['Từ 8 -> 20 triệu','Từ 20 -> 50 triệu','Trên 50 triệu']
    })
    res.locals.pri_screen = await PriceModel.find({
        'title':['Từ 1 -> 5 triệu','Từ 5 -> 10 triệu','Từ 10 -> 20 triệu','Từ 20 -> 30 triệu','Trên 30 triệu']
    })
    res.locals.screen = await TypeModel.find({
        'title':['Màn Hình 60Hz','Màn Hình 75Hz','Màn Hình 100Hz','Màn Hình 120Hz','Màn Hình 144Hz','Màn Hình 240Hz']
    })
    








    res.locals.totalCartItem = req.session.cart.reduce((total,product)=>total + product.qty,0);
    next();
}