const express = require('express');
const appRouter = express.Router();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    age:   String,
    id: String,
    date: { type: Date, default: Date.now },
  });
  const Post = mongoose.model("Post", postSchema);

//create post
appRouter.post('/', async (req, res)=> {
    const post = new Post({
        title : req.body.title,
        age : req.body.age,
        id: req.body.id
    })

    try {
        const data = await post.save(post);
        res.json(data);
    } catch (error) {
        console.log(error)
        res.json({ "error " : error})
    }
    
})

//get all post
appRouter.get('/', async(req, res)=> {

    try {
        const data = await Post.find();
        res.json(data);
    } catch (error) {
        console.log(error)
        res.json({ "error " : error})
    }
    
    
})

//get specific post
appRouter.get('/:id', async(req, res)=> {

    const id = req.params.id;
    
    try {
        const data = await Post.findOne({ id : id });
        res.json(data);
    } catch (error) {

        console.log(error)
        res.json({ "error " : error})
    }
    
})

//delete post
appRouter.delete('/:id', async(req, res)=> {
    
    const id = req.params.id;
    
    try {
        const data = await Post.deleteOne({ id : id });
        res.json(data);
    } catch (error) {
        console.log(error)
        res.json({ "error " : error})
    }
    
})

// update post
appRouter.patch('/:id',async (req, res) =>{

    try {
        const updatedPost = await Post.updateOne({title: req.params.id},  {$set: {title : req.body.title}})
        res.json(updatedPost)
    } catch (error) {
        res.json(error)
    }
})

module.exports = appRouter;