const RegModel = require('../models/reg');
const PositionModel = require('../models/position');
const path = require("path");


const index = async(req,res)=>{
    const regs = await RegModel.find().populate({path:'pos_id'}).sort({_id:-1});
    const position = await PositionModel.find();
    console.log(regs);
    res.render('admin/recruit',{
        regs:regs,
        position:position,
    })
}
const del = async (req, res) => {
    const id = req.params.id;
    await RegModel.deleteOne({_id:id});
    res.redirect('/recruit');
}

module.exports={
    index:index,
    del:del,
}