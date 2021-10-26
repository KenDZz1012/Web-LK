
const mongoose = require("../../common/database")();

const BrandSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    }, 
});

const BrandModel = mongoose.model("Brand",BrandSchema ,"brands");

module.exports = BrandModel;