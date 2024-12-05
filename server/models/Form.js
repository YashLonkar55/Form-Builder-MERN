import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const baseQuestionSchema = {
  question: {
    type: String,
    required: true
  },
  image: {
    type: String,
    maxLength: 1024 * 1024 * 10 // Limit to 2MB per image URL
  }
};

const categorizeQuestionSchema = {
  ...baseQuestionSchema,
  type: {
    type: String,
    enum: ['categorize'],
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  items: [{
    type: String,
    required: true
  }],
  correctAnswers: {
    type: Map,
    of: String,
    required: true
  }
};

const clozeQuestionSchema = {
  ...baseQuestionSchema,
  type: {
    type: String,
    enum: ['cloze'],
    required: true
  },
  sentence: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswers: {
    type: [String],
    required: true
  }
};

const comprehensionQuestionSchema = {
  ...baseQuestionSchema,
  type: {
    type: String,
    enum: ['comprehension'],
    required: true
  },
  passage: {
    type: String,
    required: true
  },
  subQuestions: [{
    question: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      required: true
    },
    correctAnswer: {
      type: Number,
      required: true
    }
  }]
};

const formSchema = new mongoose.Schema({
  formTitle: {
    type: String,
    required: true
  },
  headerImage: {
    type: String,
    maxLength: 1024 * 1024 * 10 // Limit to 2MB for header image URL
  },
  questions: [{
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function(question) {
        switch(question.type) {
          case 'categorize':
            return question.categories && question.items && question.correctAnswers;
          case 'cloze':
            return question.sentence && question.options && question.correctAnswers;
          case 'comprehension':
            return question.passage && question.subQuestions;
          default:
            return false;
        }
      },
      message: 'Question format is invalid'
    }
  }],
  shareId: {
    type: String,
    default: () => nanoid(10),
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Form = mongoose.model('Form', formSchema);