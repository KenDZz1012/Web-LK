const UserModel = require('../models/user');

const index = async(req,res)=>{
    const users = await UserModel.find();
    res.render('admin/users/user',{
        users:users,
    })
}

const create = async(req,res)=>{
    const body = req.body;
    const email = req.body.email;
    const users = await UserModel.find();
    res.render('admin/users/add_user',{
        email:email,
        users:users,
        data: {},
    })
}
const list_user = async(req,res)=>{
    const body = req.body;
    const users={
        full_name: body.full_name,
        email: body.email,
        password: body.password,
        role: body.role,
    }
    const password = body.password;
    const re_pass = body.re_password;
    const email = body.email
    let err;
    const user = await UserModel.find({email:email})
    if(user.length==0 && re_pass==password) {
        req.session.email='OK';
        new UserModel(users).save();
        res.redirect('/user');
    }
    else
    {   
        err='Email đã tồn tại !';
        
    }
    if(password!=re_pass)
    {
        err='Mật khẩu không trùng khớp';
    }
    res.render("admin/users/add_user", {data: {err: err}});
}
const del = async(req,res)=>{
    const id = req.params.id;
    await UserModel.deleteOne({_id:id})
    res.redirect('/user');
}
const edit = async(req,res)=>{
    const id = req.params.id;
    const email = req.body.email;
    const user = await UserModel.findById(id);
    res.render('admin/users/edit_user',{
        user: user,
        email:email,
        data: {},
    })
}

const update = async(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    const user={
        full_name: body.full_name,
        email: body.email,
        password: body.password,
        role: body.role,
    }
    const password = body.password;
    const re_pass = body.re_pass;
    const email = body.email
    let err;
    const users = await UserModel.find({email:email})
    if(users.length==0 && re_pass==password || email==user.email && re_pass==password) {
        req.session.email='OK';
        await UserModel.updateOne({_id:id},{$set:user});
        res.redirect('/user');
    }
    else
    {   
        err='Email đã tồn tại !';   
    }
    if(password!=re_pass)
    {
        err='Mật khẩu không trùng khớp';
    }
    res.render("admin/users/edit_user",
     {data: {err: err},
     user:user,
    });
}


module.exports={
    index:index,
    create:create,
    list_user:list_user,
    del:del,
    edit:edit,
    update:update,
}