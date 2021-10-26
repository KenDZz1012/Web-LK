const PositionModel = require('../models/position');

const index = async(req,res)=>{
    const positions = await PositionModel.find();
    console.log(positions);
    res.render('admin/positions/position',{
        positions:positions,
    })
}
const create = async(req,res)=>{
    res.render('admin/positions/add_position',{
        data: {},
    });
}
const list_pos = async(req,res)=>{
    const body = req.body;
    const positions={
        name:body.name,
    }
    const name = body.name;
    let err;
    const position = await PositionModel.find({name:name});
    if(position.length==0)
    {
        req.session.name='OK';
        new PositionModel(positions).save();
        res.redirect('/position')
    }
    else
    {
        err='Chức vụ đã tồn tại !';
    }
    res.render("admin/positions/add_position", {data: {err: err}});

}
const del =  async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    await PositionModel.deleteOne({_id:id})
    res.redirect('/position');
}

module.exports={
    index:index,
    create:create,
    list_pos:list_pos,
    del:del
}