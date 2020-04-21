const express=require('express');
const app=express();
const path=require('path');
const exphbs  = require('express-handlebars');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');

//database connection
 mongoose.connect('mongodb://localhost:27017/cms',{useNewUrlParser:true}).then(db=>{
     console.log('mongo connected');

 }).catch(error=>console.log('error'));

app.use(express.static(path.join(__dirname,'public')));


//set view engine

const {select, generateDate} = require('./helpers/handlebars-helpers');
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select, generateDate: generateDate}}));
app.set('view engine', 'handlebars');


// Method Override
app.use(methodOverride('_method'));

// Upload Middleware
app.use(upload());


//body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({

    secret: 'xavier123nodelive',
    resave: true,
    saveUninitialized: true

}));
app.use(flash());



app.use((req, res, next)=>{

     res.locals.success_message = req.flash('success_message');
    next();


});


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