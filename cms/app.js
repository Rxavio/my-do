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
const {mongoDbUrl} = require('./config/database');
const passport = require('passport');

//database connection
 mongoose.connect(mongoDbUrl,{useNewUrlParser:true}).then(db=>{
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

// PASSPORT

app.use(passport.initialize());
app.use(passport.session());



// Local Variables using Middleware
app.use((req, res, next)=>{

    res.locals.user = req.user || null;

    res.locals.success_message = req.flash('success_message');

    res.locals.error_message = req.flash('error_message');

    res.locals.form_errors = req.flash('form_errors');

    res.locals.error = req.flash('error');

    next();


});


//load routes
const home=require('./routes/home/index');
const admin=require('./routes/admin/index');
const posts=require('./routes/admin/posts');
const categories = require('./routes/admin/categories')

//use routes
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);



app.listen(4500,()=>{
    console.log('listening on port 4500');
});