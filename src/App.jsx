import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormBuilder from './components/FormBuilder/FormBuilder';
import FormPreview from './components/FormPreview/FormPreview';
import SharedForm from './components/FormShare/SharedForm';
ThankYou
import './App.css';
import ThankYou from './components/ThankYou/ThankYou';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/preview" element={<FormPreview />} />
        <Route path="/form/:shareId" element={<SharedForm />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;