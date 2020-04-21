const express=require('express');
const router=express.Router();
const Post=require('../../models/Post');
const { isEmpty, uploadDir } = require('../../helpers/upload-helper');
const fs = require('fs');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout='admin';
    next();
    });

router.get('/',(req,res)=>{
    Post.find({}).then(posts=>{
    // console.log(posts);
    res.render('admin/posts',{posts: posts}); 
    });

    });

router.get('/create',(req,res)=>{

res.render('admin/posts/create'); 
    
    });


router.post('/create',(req,res)=>{

    let filename = 'default.jpg';
     if(!isEmpty(req.files)){

        let file = req.files.file;
        filename = Date.now() + '-' + file.name;

        file.mv('./public/uploads/' + filename, (err)=>{

            if(err) throw err;

        });

    }
let allowComments = true;
if(req.body.allowComments){

    allowComments = true;

} else{

    allowComments = false;

}
const newPost = new Post({
    title: req.body.title,
    status: req.body.status,
    allowComments: allowComments,
    body: req.body.body,
    file: filename
        });
newPost.save().then(savePost=>{

req.flash('success_message', 'Post was successfully updated');

res.redirect('/admin/posts');
}).catch(error=>{
console.log('could not save post');
}); 
 //console.log(req.body)
 });


router.get('/edit/:id', (req, res)=>{

    Post.findOne({_id: req.params.id})
        .then(post=>{    

     res.render('admin/posts/edit', {post: post});
   
   
    });
});

// POST UPDATING

router.put('/edit/:id', (req, res)=>{

    Post.findOne({_id: req.params.id})

        .then(post=>{
            if(req.body.allowComments){
                allowComments = true;
            } else{
                allowComments = false;
            }

            post.title = req.body.title;
            post.status = req.body.status;
            post.allowComments = allowComments;
            post.body = req.body.body;

            post.save().then(updatedPost=>{
                res.redirect('/admin/posts');
            });

        });

});


router.delete('/:id', (req, res)=>{
    Post.findOne({_id: req.params.id})
        .then(post =>{
        fs.unlink(uploadDir + post.file, (err)=>{
            post.remove();
         res.redirect('/admin/posts');
          });
       });
    });

 module.exports=router;