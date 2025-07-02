const express = require('express');
const router = express.Router();

const {
  CreatePost,
  GetAllPosts,
  GetpostById,
  updatePost,
  deletePost,
  GetMyPosts
} = require('../controllers/postcontroller');

const requireAuth = require('../middleware/authMiddleware'); // 🔒 Import the auth middleware

// ✅ Create a new post (User must be logged in)
router.post('/', requireAuth, CreatePost);

// ✅ Get all posts (Public or Admin/internal usage)
router.get('/', GetAllPosts);

router.get('/my-posts', requireAuth, GetMyPosts);

// ✅ Get a single post by ID (Public)
router.get('/:id', GetpostById);

// ✅ Update a post (User must be logged in)
router.patch('/:id', requireAuth, updatePost);


// ✅ Delete a post (User must be logged in)
router.delete('/:id', requireAuth, deletePost);



module.exports = router;
