const app = require('../apps/app');

const config = require('config');

app.listen(port=config.get('app').port,()=>{
        console.log(`server is running on port ${port}`);
})
