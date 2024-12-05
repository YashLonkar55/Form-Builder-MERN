import React, { useState } from 'react';

const CategorizeQuestion = ({ question, updateQuestion, isEditing }) => {
  const [newOption, setNewOption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);


  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    if (!draggedItem) return;

    // Update the correctAnswers map
    const updatedCorrectAnswers = { ...question.correctAnswers };
    updatedCorrectAnswers[draggedItem] = category;

    updateQuestion({
      ...question,
      correctAnswers: updatedCorrectAnswers
    });

    setDraggedItem(null);
  };

  const addOption = () => {
    if (!newOption.trim()) return;

    updateQuestion({
      ...question,
      items: [...question.items, newOption.trim()],
      correctAnswers: {
        ...question.correctAnswers,
        [newOption.trim()]: selectedCategory
      }
    });

    setNewOption('');
  };

  const removeOption = (item) => {
    const updatedItems = question.items.filter(i => i !== item);
    const updatedCorrectAnswers = { ...question.correctAnswers };
    delete updatedCorrectAnswers[item];

    updateQuestion({
      ...question,
      items: updatedItems,
      correctAnswers: updatedCorrectAnswers
    });
  };

  // Get all items
  const getAllOptions = () => {
    return question.items || [];
  };

  const getItemsForCategory = (category) => {
    return getAllOptions().filter(item => question.correctAnswers[item] === category);
  };

  const handleCategoryEdit = (index, newName) => {
    const updatedCategories = [...question.categories];
    const oldCategory = updatedCategories[index];
    updatedCategories[index] = newName;

    // Update correct answers with new category name
    const updatedCorrectAnswers = { ...question.correctAnswers };
    Object.keys(updatedCorrectAnswers).forEach(item => {
      if (updatedCorrectAnswers[item] === oldCategory) {
        updatedCorrectAnswers[item] = newName;
      }
    });

    updateQuestion({
      ...question,
      categories: updatedCategories,
      correctAnswers: updatedCorrectAnswers
    });
    setEditingCategoryIndex(null);
  };




  return (
    <div className="mt-4">
      {isEditing && (
        <>
          {/* Question Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Text
            </label>
            <input
              type="text"
              value={question.question || ''}
              onChange={(e) =>
                updateQuestion({ ...question, question: e.target.value })
              }
              placeholder="Enter your question"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

            {/* Column Names Section */}
            <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Column Names
            </label>
            <div className="grid grid-cols-2 gap-4">
              {question.categories.map((category, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                Column {index === 0 ? 'A' : 'B'}
                </label>
                <input
                type="text"
                value={category}
                onChange={(e) => handleCategoryEdit(index, e.target.value)}
                className="p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={`Enter Column ${index === 0 ? 'A' : 'B'} name`}
                />
              </div>
              ))}
            </div>
            </div>


          {/* Items Section - Only show after categories are added */}
          {question.categories.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Items
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add new item"
                  className="flex-1 p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {question.categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addOption}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Display Section */}
      <div className="space-y-4">
        {/* Only show items pool if there are items */}
        {question.items && question.items.length > 0 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Items</h4>
            <div className="flex flex-wrap gap-2">
              {getAllOptions().map((item, index) => (
                <div
                  key={index}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="bg-white border border-gray-200 p-2 rounded cursor-move hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2">
                    <span>{item}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeOption(item)}
                        className="text-red-500 hover:text-red-600 px-2"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Only show categories grid if there are categories */}
        {question.categories.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {question.categories.map((category, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 min-h-[200px] bg-white"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, category)}
              >
                {isEditing && editingCategoryIndex === index ? (
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => handleCategoryEdit(index, e.target.value)}
                    onBlur={() => setEditingCategoryIndex(null)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        setEditingCategoryIndex(null);
                      }
                    }}
                    className="font-semibold mb-2 p-1 border rounded w-full"
                    autoFocus
                  />
                ) : (
                  <h4 
                    className="font-semibold mb-2 cursor-pointer"
                    onClick={() => isEditing && setEditingCategoryIndex(index)}
                  >
                    {category}
                    {isEditing && (
                      <span className="ml-2 text-xs text-gray-500">(click to edit)</span>
                    )}
                  </h4>
                )}
                <div className="space-y-2">
                  {getItemsForCategory(category).map((item, itemIndex) => (
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
        )}
      </div>
    </div>
  );
};

export default CategorizeQuestion;
