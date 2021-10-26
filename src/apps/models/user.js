// gọi file kết nối tới mongoose + () chạy hàm để lấy return 
const mongoose = require('../../common/database')();

// sử dụng Schema để mô tả collection user
const userSchema = mongoose.Schema({
    full_name : {
        type: String,
        default: null,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ["member", "admin"],
        default: "menber",
    },

});

// chuyển userSchema thành models
                                // bí danh , Schema , collection
const UserModel = mongoose.model("User",userSchema,"users");  

module.exports = UserModel;