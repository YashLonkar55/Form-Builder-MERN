import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const saveForm = async (formData) => {
  const response = await api.post('/forms', formData);
  return response.data;
};

export const getSharedForm = async (shareId) => {
  const response = await api.get(`/forms/shared/${shareId}`);
  return response.data;
};

export const submitResponse = async (responseData) => {
  const response = await api.post('/responses', responseData);
  return response.data;
};

export const getFormResponses = async (formId) => {
  const response = await api.get(`/responses/form/${formId}`);
  return response.data;
};