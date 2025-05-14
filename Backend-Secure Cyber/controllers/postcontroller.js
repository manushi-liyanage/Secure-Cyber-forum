const express = require('express')
const postSchema = require('../models/postModel')


// get all posts
const GetAllPosts = async (req, res) => {
    try {
        const posts = await postSchema.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// post a new POST
const CreatePost = async (req ,res) =>{
    let {title , companyEmail ,description ,company,Category,visualContent,visualContentType} = req.body

     try{
        const newPost = await postSchema.create({title , companyEmail ,description ,company,Category,visualContent,visualContentType})
        res.status(200).json(newPost)
       }catch(error){
        console.error(error); 
        res.status(400).json({ message: error.message });
       }

}

// get a single post  by id

const GetpostById = async (req ,res) =>{

    const {id} = req.params;

    try{
        const post = await postSchema.findById(id);

        if(!post){
            return res.status(400).json({message : "Post Not Found"});
        }

        res.status(200).json(post);
    }catch(error){
        res.status(400).json({error: error.message});
    }

}

// update the post

const updatePost = async( req , res) =>{

    
    const {id} = req.params;

    try {
        const updatedPost = await postSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//delete the post

const deletePost = async (req, res) => {
    const {id} = req.params;

    try{
        const deleteApost = await postSchema.findByIdAndDelete(id);

        if(!deleteApost){
            return res.status(404).json({message: "Post not found"});
        }

        res.status(200).json({ message: "Post deleted successfully" })
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

module.exports ={
    CreatePost,
    GetAllPosts,
    GetpostById,
    updatePost,
    deletePost
}