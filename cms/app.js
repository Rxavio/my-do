const express=require('express');
const exphbs  = require('express-handlebars');
const app=express();
const path=require('path');




app.use(express.static(path.join(__dirname,'public')));

//set view engine
app.engine('handlebars', exphbs({defaultLayout:'home'}));
app.set('view engine', 'handlebars');

app.get('/', (req,res)=>{
    res.render('home/index');
});

app.listen(4500,()=>{
    console.log('listening on port 4500');
});