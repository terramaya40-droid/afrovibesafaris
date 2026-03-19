import express from 'express';
import Article from '../models/Article.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// GET all published articles (Public)
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find({ published: true }).sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});

// GET single article by slug (Public)
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug, published: true });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error: error.message });
  }
});

// GET all articles including drafts (Admin only)
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all articles', error: error.message });
  }
});

// POST create new article (Admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const article = new Article(req.body);
    const saved = await article.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error creating article', error: error.message });
  }
});

// PUT update article (Admin only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Article not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating article', error: error.message });
  }
});

// DELETE article (Admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error: error.message });
  }
});

export default router;
