const express=require('express');
const exphbs  = require('express-handlebars');
const mongoose=require('mongoose');
const app=express();
const path=require('path');


//database connection
mongoose.connect('mongodb://localhost:27017/cms',{useNewUrlParser:true}).then(db=>{
    console.log('mongo connected');

}).catch(error=>console.log('error'));




app.use(express.static(path.join(__dirname,'public')));

//set view engine
app.engine('handlebars', exphbs({defaultLayout:'home'}));
app.set('view engine', 'handlebars');


//load routes
const home= require('./routes/home/index');
const admin=require('./routes/admin/index');
const posts=require('./routes/admin/posts');




//use routes
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);


app.listen(4500,()=>{
    console.log('listening on port 4500');
});