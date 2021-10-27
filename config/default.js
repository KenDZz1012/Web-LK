module.exports={
    app:{
        port: process.env.PORT || 3000,
        views_floder: __dirname+'/../src/apps/views',
        views_engine: 'ejs',
        static_folder: __dirname+'/../src/public',
        session_key: "lkgear",
        session_secure: false,
        temp : __dirname + "/../temp",
    },

    mail: {
        host: "smtp.gmail.com",
        post: 587,
        secure: false,
        auth: {
            user: "vietpro.shop28@gmail.com",
            pass: "rnqqtpbwsivtqopl",
        }
    }
}
