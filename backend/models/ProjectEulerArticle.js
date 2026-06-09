import mongoose from 'mongoose';

const projectEulerArticleSchema = new mongoose.Schema({
  problemNumber: {
    type: Number,
    required: [true, 'Problem number is required'],
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  problemStatement: {
    type: String,
    trim: true,
    default: '',
  },
  answer: {
    type: String,
    trim: true,
    default: '',
  },
  solution: {
    code: {
      type: String,
      required: [true, 'Solution code is required'],
    },
    language: {
      type: String,
      required: [true, 'Programming language is required'],
      default: 'Python',
    },
    explanation: {
      type: String,
      trim: true,
      default: '',
    },
    timeComplexity: {
      type: String,
      trim: true,
    },
    spaceComplexity: {
      type: String,
      trim: true,
    },
  },
  tags: [{
    type: String,
    trim: true,
  }],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

projectEulerArticleSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const ProjectEulerArticle = mongoose.model('ProjectEulerArticle', projectEulerArticleSchema);

export default ProjectEulerArticle;

