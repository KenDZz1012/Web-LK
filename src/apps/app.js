const express = require('express');

const app = express();

const config = require('config');

const session = require("express-session")


//dung cho form
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//	config ejs template engine
app.set("views",config.get('app').views_floder);
app.set("view engine",  config.get('app').views_engine);
app.use("/static", express.static(config.get('app').static_folder));

//session
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(require("../apps/middlewares/cart"));
app.use(require("../apps/middlewares/share"));



app.use(require("../routers/web"));
module.exports = app;