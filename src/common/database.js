const mongoose = require("mongoose");

module.exports = ()=>{
    mongoose.connect('mongodb://localhost/LK_Gear',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true 
    });
    return mongoose;
}