import express from 'express';
import ProjectEulerArticle from '../models/ProjectEulerArticle.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', async (req, res) => {
  try {
    const {
      problemNumber,
      title,
      description,
      problemStatement,
      solution,
      tags,
      difficulty,
      published,
    } = req.body;

    if (!problemNumber || !title || !description || !problemStatement || !solution) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    const article = new ProjectEulerArticle({
      problemNumber,
      title,
      description,
      problemStatement,
      solution,
      tags: tags || [],
      difficulty: difficulty || 'Medium',
      published: published || false,
    });

    const savedArticle = await article.save();

    res.status(201).json({
      success: true,
      data: savedArticle,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Article with this problem number already exists',
      });
    }
    console.error('Error creating article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create article',
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort = '-problemNumber',
      search = '',
      difficulty = '',
      published = '',
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const query = {};

    if (published !== '') {
      query.published = published === 'true';
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const articles = await ProjectEulerArticle.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .select('-__v');

    const total = await ProjectEulerArticle.countDocuments(query);

    res.json({
      success: true,
      data: articles,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch articles',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const article = await ProjectEulerArticle.findById(req.params.id).select('-__v');

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found',
      });
    }

    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid article ID',
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to fetch article',
    });
  }
});

router.get('/problem/:number', async (req, res) => {
  try {
    const article = await ProjectEulerArticle.findOne({
      problemNumber: parseInt(req.params.number),
    }).select('-__v');

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found',
      });
    }

    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch article',
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const article = await ProjectEulerArticle.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found',
      });
    }

    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update article',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const article = await ProjectEulerArticle.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found',
      });
    }

    res.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete article',
    });
  }
});

export default router;

