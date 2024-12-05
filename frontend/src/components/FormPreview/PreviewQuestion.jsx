import React from 'react';
import PreviewCategorizeQuestion from './QuestionTypes/PreviewCategorizeQuestion';
import PreviewClozeQuestion from './QuestionTypes/PreviewClozeQuestion';
import PreviewComprehensionQuestion from './QuestionTypes/PreviewComprehensionQuestion';

const PreviewQuestion = ({ question, index }) => {
  const renderQuestion = () => {
    switch (question.type) {
      case 'categorize':
        return <PreviewCategorizeQuestion question={question} />;
      case 'cloze':
        return <PreviewClozeQuestion question={question} />;
      case 'comprehension':
        return <PreviewComprehensionQuestion question={question} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <span className="text-sm text-gray-500">Question {index + 1}</span>
        {question.image && (
          <img
            src={question.image}
            alt={`Question ${index + 1}`}
            className="mt-2 max-h-40 object-contain"
          />
        )}
      </div>
      {renderQuestion()}
    </div>
  );
};

export default PreviewQuestion;