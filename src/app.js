const express = require('express');
const fs = require('fs');

require('dotenv').config();

const routeCategories = require('./router/routeCategories.js');
const routeProduct    = require('./router/routerProduct.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

if(!fs.existsSync('./uploads')){
    fs.mkdirSync('./uploads');
}
app.use('/api', routeCategories);
app.use('/api', routeProduct);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});