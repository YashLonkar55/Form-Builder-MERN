import React, { useState } from 'react';

const PreviewClozeQuestion = ({ question }) => {
  const [answers, setAnswers] = useState({});
  const [draggedOption, setDraggedOption] = useState(null);

  const handleDragStart = (e, option) => {
    setDraggedOption(option);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    setDraggedOption(null);
    e.target.classList.remove('opacity-50');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, blankId) => {
    e.preventDefault();
    if (!draggedOption) return;

    setAnswers({
      ...answers,
      [blankId]: draggedOption
    });
  };

  const renderText = () => {
    if (!question.question) return null;

    const parts = question.question.split(/(\______)/g);
    return parts.map((part, index) => {
      if (part === '______') {
        const blankId = `blank_${index}`;
        return (
          <span
            key={index}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, blankId)}
            className="inline-block"
          >
            <span 
              className={`inline-block min-w-[120px] mx-1 px-2 py-1 border-b-2 text-center ${
                answers[blankId]
                  ? 'bg-green-50 border-green-500 text-green-800'
                  : 'border-gray-300 text-gray-500'
              }`}
            >
              {answers[blankId] || '______'}
            </span>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div>
      <div className="mb-4 text-lg">{renderText()}</div>
      <div className="flex flex-wrap gap-2">
        {(question.options || []).map((option, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, option)}
            onDragEnd={handleDragEnd}
            className="bg-gray-100 px-3 py-1 rounded-full cursor-move hover:bg-gray-200 transition-colors"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewClozeQuestion;