const express = require('express');
const { createBlog, getAllBlogs, updateBlog, deleteBlog } = require('../controllers/blogController');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadImgMiddleware');
const router = express.Router();



// Update a blog (Authors only)
router.put('/:id', authenticateUser, authorizeRole('author'), updateBlog);

// Delete a blog (Authors only)
router.delete('/:id', authenticateUser, authorizeRole('author'), deleteBlog);

router.post(
  '/',
  (req, res, next) => {
    console.log('Blog upload route hit');
    console.log('Headers:', req.headers); 
    console.log('Body:', req.body); 
    next(); 
  },
  authenticateUser,
  authorizeRole('author'),
  upload.single('image'),
  createBlog
);


router.get('/', authenticateUser, getAllBlogs);

module.exports = router;
