// gọi file kết nối tới mongoose + () chạy hàm để lấy return 
const mongoose = require('../../common/database')();

// sử dụng Schema để mô tả collection user
const cartSchema = mongoose.Schema({
    name : {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
    },
    sdt: {
        type: String,
        default: null,
    },
    add: {
        type: String,
        default: null,
    },
    items: {
        type: Object,
        default: null,
    },
});

// chuyển userSchema thành models
                                // bí danh , Schema , collection
const CartModel = mongoose.model("Cart",cartSchema,"carts");  

module.exports = CartModel;