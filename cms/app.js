const express=require('express');
const app=express();
const path=require('path');
const exphbs  = require('express-handlebars');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const methodOverride = require('method-override');
const upload = require('express-fileupload');

//database connection
 mongoose.connect('mongodb://localhost:27017/cms',{useNewUrlParser:true}).then(db=>{
     console.log('mongo connected');

 }).catch(error=>console.log('error'));

app.use(express.static(path.join(__dirname,'public')));

const {select} = require('./helpers/handlebars-helpers');


//set view engine
app.engine('handlebars', exphbs({defaultLayout:'home', helpers: {select: select}}));
app.set('view engine', 'handlebars');


// Method Override
app.use(methodOverride('_method'));

// Upload Middleware
app.use(upload());


//body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//load routes
const home=require('./routes/home/index');
const admin=require('./routes/admin/index');
const posts=require('./routes/admin/posts');

//use routes
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);



app.listen(4500,()=>{
    console.log('listening on port 4500');
});