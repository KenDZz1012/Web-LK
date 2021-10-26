
const mongoose = require("../../common/database")();

const TypeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    }, 
});

const TypeModel = mongoose.model("Type",TypeSchema ,"types");

module.exports = TypeModel;