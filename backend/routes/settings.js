import express from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/settings - Fetch public site settings
router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne({});
    if (!settings) {
      // If none exists, create default
      settings = await SiteSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching site settings', error: error.message });
  }
});

// PUT /api/settings - Update site settings (Admin only)
router.put('/', verifyToken, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne({});
    if (!settings) {
      settings = new SiteSettings(req.body);
      await settings.save();
    } else {
      // Update fields
      settings.home = req.body.home || settings.home;
      settings.about = req.body.about || settings.about;
      settings.wellness = req.body.wellness || settings.wellness;
      settings.travelServices = req.body.travelServices || settings.travelServices;
      settings.contact = req.body.contact || settings.contact;
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating site settings', error: error.message });
  }
});

export default router;
