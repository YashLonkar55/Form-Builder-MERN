import React, { useState } from 'react';

const PreviewCategorizeQuestion = ({ question }) => {
  const [answers, setAnswers] = useState({
    [question.categories[0]]: [],
    [question.categories[1]]: []
  });
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetCategory) => {
    e.preventDefault();
    if (!draggedItem) return;

    const updatedAnswers = { ...answers };

    // Remove from all categories if it exists
    question.categories.forEach(category => {
      updatedAnswers[category] = updatedAnswers[category].filter(
        item => item !== draggedItem
      );
    });

    // Add to target category
    updatedAnswers[targetCategory] = [...updatedAnswers[targetCategory], draggedItem];

    setAnswers(updatedAnswers);
    setDraggedItem(null);
  };

  // Get all unused items
  const getUnusedItems = () => {
    const usedItems = Object.values(answers).flat();
    return question.items.filter(item => !usedItems.includes(item));
  };

  return (
    <div className="mt-4">
      <div className="space-y-4">
        {/* Question Text */}
        <div className="mb-4">
          <p className="text-lg font-medium">{question.question}</p>
        </div>

        {/* Items Pool */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Items to Categorize</h4>
          <div className="flex flex-wrap gap-2">
            {getUnusedItems().map((item, index) => (
              <div
                key={index}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, item)}
                className="bg-white border border-gray-200 p-2 rounded cursor-move hover:shadow-md transition-shadow"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4">
          {question.categories.map((category, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 min-h-[200px] bg-white"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, category)}
            >
              <h4 className="font-semibold mb-2">{category}</h4>
              <div className="space-y-2">
                {answers[category].map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-gray-50 p-2 rounded border border-gray-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewCategorizeQuestion;
