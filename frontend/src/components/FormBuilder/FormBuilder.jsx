import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormHeader from './FormHeader';
import QuestionCard from './QuestionCard';
import QuestionToolbar from './QuestionToolbar';
import SharePopup from '../common/SharePopup';
import { saveForm } from '../../services/api';
import { EyeIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';


const FormBuilder = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(() => {
    const savedForm = localStorage.getItem('formBuilderState');
    if (savedForm) {
      const { questions } = JSON.parse(savedForm);
      return questions;
    }
    return [];
  });
  
  const [formTitle, setFormTitle] = useState(() => {
    const savedForm = localStorage.getItem('formBuilderState');
    if (savedForm) {
      const { formTitle } = JSON.parse(savedForm);
      return formTitle;
    }
    return 'Untitled Form';
  });
  
  const [headerImage, setHeaderImage] = useState(() => {
    const savedForm = localStorage.getItem('formBuilderState');
    if (savedForm) {
      const { headerImage } = JSON.parse(savedForm);
      return headerImage;
    }
    return null;
  });
  
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shareId, setShareId] = useState(null);

  useEffect(() => {
    const formState = {
      questions,
      formTitle,
      headerImage
    };
    localStorage.setItem('formBuilderState', JSON.stringify(formState));
  }, [questions, formTitle, headerImage]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (questions.length > 0 || formTitle !== 'Untitled Form' || headerImage) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [questions, formTitle, headerImage]);

  const handleUpdateQuestion = (questionId, updatedData) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          ...updatedData
        };
      }
      return q;
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now().toString(),
      type,
      question: '',
      image: null
    };

    if (type === 'categorize') {
      newQuestion.categories = ['Column A', 'Column B'];  // Initialize with exactly two columns
      newQuestion.items = [];
      newQuestion.correctAnswers = {};  // Regular object for correctAnswers
    } else if (type === 'cloze') {
      newQuestion.sentence = '';
      newQuestion.options = [];
      newQuestion.correctAnswers = [];
    } else if (type === 'comprehension') {
      newQuestion.passage = '';
      newQuestion.subQuestions = [];
    }

    setQuestions(prev => [...prev, newQuestion]);
  };

  const handleUpdateCategories = (questionId, newCategories) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          categories: newCategories
        };
      }
      return q;
    }));
  };

  const handleSaveForm = async () => {
    try {
      const formData = {
        formTitle,
        headerImage,
        questions: questions.map(q => ({
          ...q,
          id: undefined,
          _id: q.id
        })),
        createdAt: new Date().toISOString(),
      };
      const response = await saveForm(formData);
      setShareId(response.shareId);
      setShowSharePopup(true);
      // Clear localStorage after successful save
      localStorage.removeItem('formBuilderState');
    } catch (error) {
      console.error('Failed to save form:', error);
      alert('Failed to save form. Please try again.');
    }
  };

  const handleResetForm = () => {
    if (window.confirm('Are you sure you want to reset the form? All unsaved changes will be lost.')) {
      setQuestions([]);
      setFormTitle('Untitled Form');
      setHeaderImage(null);
      localStorage.removeItem('formBuilderState');
    }
  };

  const handlePreview = () => {
    const formData = {
      formTitle,
      headerImage,
      questions,
    };
    navigate('/preview', { state: { formData } });
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="text-xl focus:outline-none"
              placeholder="Untitled form"
            />
          </div>
            <div className="flex items-center gap-4">
            <button
              onClick={handleResetForm}
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Reset Form
            </button>
            <button
              onClick={handlePreview}
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <EyeIcon className="h-5 w-5 mr-2" />
              Preview
            </button>
            <button
              onClick={handleSaveForm}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              <DocumentCheckIcon className="h-5 w-5 mr-2" />
              Save
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto pt-24 px-4">
        <FormHeader
          formTitle={formTitle}
          setFormTitle={setFormTitle}
          headerImage={headerImage}
          onImageUpload={handleImageUpload}
        />

        <div className="mt-6 space-y-4">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              questions={questions}
              setQuestions={setQuestions}
              onUpdateCategories={handleUpdateCategories}
              onUpdateQuestion={handleUpdateQuestion}
            />
          ))}
        </div>

        <QuestionToolbar onAddQuestion={addQuestion} />
      </main>

      {showSharePopup && (
        <SharePopup
          shareId={shareId}
          onClose={() => setShowSharePopup(false)}
        />
      )}
    </div>
  );
};

export default FormBuilder;