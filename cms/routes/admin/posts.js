const express=require('express');
const router=express.Router();

router.all('/*',(req,res,next)=>{
    req.app.locals.layout='admin';
    next();
    });

 router.get('/create',(req,res)=>{

    res.render('admin/posts/create'); 
               
     });    



     router.get('/index',(req,res)=>{

        res.render('admin/posts/'); 
        });
        
    

        module.exports=router;