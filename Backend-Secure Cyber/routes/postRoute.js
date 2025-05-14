const express = require('express')

const {CreatePost ,GetAllPosts ,GetpostById ,updatePost ,deletePost} = require('../controllers/postcontroller')
const router = express.Router()





//post a new post
router.post('/',CreatePost )

//get all posts
router.get('/' , GetAllPosts)

//get post by its id
router.get('/:id' , GetpostById)

//update posts
router.patch('/:id' , updatePost)

//delete post
router.delete('/:id' ,deletePost)

 


module.exports = router



