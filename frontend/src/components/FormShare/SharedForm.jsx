import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSharedForm, submitResponse } from '../../services/api';
import PreviewQuestion from '../FormPreview/PreviewQuestion';

const SharedForm = () => {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadForm = async () => {
      try {
        const data = await getSharedForm(shareId);
        setForm(data);
      } catch (err) {
        setError('Form not found');
      } finally {
        setLoading(false);
      }
    };
    loadForm();
  }, [shareId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitResponse({
        formId: form._id,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer
        }))
      });
      navigate(`/thank-you`);
    } catch (err) {
      setError('Failed to submit response');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!form) return <div>Form not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow">
          {form.headerImage && (
            <div className="h-40 w-full overflow-hidden rounded-t-lg">
              <img
                src={form.headerImage}
                alt="Form header"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h1 className="text-3xl font-normal mb-8">{form.formTitle}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {form.questions.map((question, index) => (
                <PreviewQuestion
                  key={question._id}
                  question={question}
                  index={index}
                  onAnswer={(answer) => 
                    setAnswers(prev => ({
                      ...prev,
                      [question._id]: answer
                    }))
                  }
                />
              ))}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedForm;