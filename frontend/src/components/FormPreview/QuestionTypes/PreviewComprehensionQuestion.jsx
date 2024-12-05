import React, { useState } from 'react';

const PreviewComprehensionQuestion = ({ question }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  return (
    <div>
      <div className="mb-4">
        <p className="whitespace-pre-wrap">{question.passage}</p>
      </div>
      <div className="space-y-4">
        {(question.subQuestions || []).map((subQ, index) => (
          <div key={subQ.id} className="border rounded p-4">
            <h4 className="font-semibold mb-2">
              Question {index + 1}: {subQ.question}
            </h4>
            <div className="space-y-2">
              {subQ.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`answer-${subQ.id}`}
                    checked={answers[subQ.id] === optionIndex}
                    onChange={() => handleAnswerChange(subQ.id, optionIndex)}
                    className="form-radio h-4 w-4 text-purple-600"
                  />
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewComprehensionQuestion;