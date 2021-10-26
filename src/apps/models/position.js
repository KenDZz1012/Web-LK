const mongoose = require("../../common/database")();
const positionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
})
const PositionModel = mongoose.model("Position",positionSchema,"positions");

module.exports=PositionModel;
