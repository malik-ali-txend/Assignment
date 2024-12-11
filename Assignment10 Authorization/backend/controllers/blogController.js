const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const blog = new Blog({
      title,
      content,
      author: req.user.userId, // Assume `req.user` is set by `authenticateUser`
      image: req.file ? req.file.path : null, // Save image path if uploaded
    });

    await blog.save();

    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    console.error('Error creating blog:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


// Update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  if (blog.author.toString() !== req.user.userId) {
    return res.status(403).json({ message: 'Not authorized to edit this blog' });
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;
  await blog.save();

  res.json({ message: 'Blog updated successfully', blog });
};

// Delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  if (blog.author.toString() !== req.user.userId) {
    return res.status(403).json({ message: 'Not authorized to delete this blog' });
  }

  await blog.remove();
  res.json({ message: 'Blog deleted successfully' });
};

const getAllBlogs = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;

  const query = search ? { title: new RegExp(search, 'i') } : {}; // Case-insensitive search

  const blogs = await Blog.find(query)
    .populate('author', 'name email')
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ message: 'Blogs retrieved successfully', blogs });
};


module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog, 
  deleteBlog,
};
