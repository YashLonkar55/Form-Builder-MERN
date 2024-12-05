import express from 'express';
import  Response  from '../models/Response.js';

const router = express.Router();

// Submit a form response
router.post('/', async (req, res) => {
  try {
    const response = new Response(req.body);
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get responses for a form
router.get('/form/:formId', async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId })
      .sort({ submittedAt: -1 });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const responseRoutes = router;