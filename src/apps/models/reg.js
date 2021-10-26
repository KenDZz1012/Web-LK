const mongoose = require("../../common/database")();
const regSchema = new mongoose.Schema({
    pos_id:{
        type: mongoose.Types.ObjectId,
        ref: "Position",
    },
    name:{
        type: String,
        default:null,
    },
    birth:{
        type:Number,
        default:null,
    },
    sdt:{
        type: String,
        default:null,
    },
    gender:{
        type:String,
        default:null,
    },
    email:{
        type: String,
        default:null,
    },
    adress:{
        type: String,
        default:null,
    },
    description:{
        type: String,
        default:null,
    }
})
const RegModel = mongoose.model("Reg",regSchema,"reg");  

module.exports = RegModel;
