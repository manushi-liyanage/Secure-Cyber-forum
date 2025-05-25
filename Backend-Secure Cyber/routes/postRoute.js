const express = require('express');
const router = express.Router();

const {
  CreatePost,
  GetAllPosts,
  GetpostById,
  updatePost,
  deletePost
} = require('../controllers/postcontroller');

// ✅ Create a new post (User)
router.post('/', CreatePost);

// ✅ Get all posts (Admin or internal usage)
router.get('/', GetAllPosts);

// ✅ Get a single post by ID
router.get('/:id', GetpostById);

// ✅ Update a post (User edits → status reset to pending)
router.patch('/:id', updatePost);

// ✅ Delete a post (User or Admin)
router.delete('/:id', deletePost);

module.exports = router;
