const express=require('express');
const app=express();
const path=require('path');




app.use(express.static(path.join(__dirname,'public')));



app.get('/', (req,res)=>{
    res.send('It works');
});

app.listen(4500,()=>{
    console.log('listening on port 4500');
});