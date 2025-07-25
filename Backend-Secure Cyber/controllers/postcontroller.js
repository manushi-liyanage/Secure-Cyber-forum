const express = require('express');
const postSchema = require('../models/postModel'); 


// Get all posts (Admin or internal usage)
const GetAllPosts = async (req, res) => {
    try {
        const posts = await postSchema.find({ status: "approved" }).populate("userId", "name email");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Create a new post (User)
const CreatePost = async (req, res) => {
    const {
        title,
        companyEmail,
        description,
        company,
        category,
        visualContent,
        visualContentType
    } = req.body;

    try {
        const newPost = await postSchema.create({
            title,
            companyEmail,
            description,
            company,
            category,
            visualContent,
            visualContentType,
            userId: req.user.userId, // Authenticated user
            status: "pending"
        });

        res.status(201).json({
            message: "Post submitted for approval",
            post: newPost
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// Get single post by ID
const GetpostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postSchema.findById(id).populate("userId", "name email");

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update post (User edits → goes back to pending)
// const updatePost = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const updatedPost = await postSchema.findByIdAndUpdate(
//             id,
//             {
//                 ...req.body,
//                 status: "pending" // Post reverts to pending on edit
//             },
//             { new: true }
//         );

//         if (!updatedPost) {
//             return res.status(404).json({ message: "Post not found" });
//         }

//         res.status(200).json({
//             message: "Post updated and set to pending",
//             post: updatedPost
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postSchema.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check ownership
    if (post.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to edit this post" });
    }

    const updatedPost = await postSchema.findByIdAndUpdate(
      id,
      {
        ...req.body,
        status: "pending",
      },
      { new: true }
    );

    res.status(200).json({
      message: "Post updated and set to pending",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// Delete post
// const deletePost = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedPost = await postSchema.findByIdAndDelete(id);

//         if (!deletedPost) {
//             return res.status(404).json({ message: "Post not found" });
//         }

//         res.status(200).json({ message: "Post deleted successfully" });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };


const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postSchema.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check ownership
    if (post.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to delete this post" });
    }

    await postSchema.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//get posts created by the logged-in user
const GetMyPosts = async (req, res) => {
  try {
    const posts = await postSchema.find({ userId: req.user.userId }).populate("userId", "name email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
    CreatePost,
    GetAllPosts,
    GetpostById,
    updatePost,
    deletePost,
    GetMyPosts
};
