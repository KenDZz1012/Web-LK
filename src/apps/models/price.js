
const mongoose = require("../../common/database")();

const PriceSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    }, 
});

const PriceModel = mongoose.model("Price",PriceSchema ,"prices");

module.exports = PriceModel;