import express from 'express';
import { Form } from '../models/Form.js';

const router = express.Router();

// Create a new form
router.post('/', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get form by shareId
router.get('/shared/:shareId', async (req, res) => {
  try {
    const form = await Form.findOne({ shareId: req.params.shareId });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const formRoutes = router;