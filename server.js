const app = require('./app');
const {Sequelize} = require('sequelize');
const sequelize = require('./config/db');


sequelize.sync();
const port = process.env.PORT || 3334;
app.listen(port, ()=>{
    console.log(`Application running on port ${port}`)
});