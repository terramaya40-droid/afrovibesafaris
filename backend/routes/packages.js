import express from 'express';
import Package from '../models/Package.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find({})
      .lean()
      .select('title country description image rating reviewCount packageType category duration pricing');
    res.set('Cache-Control', 'public, max-age=3600');
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages', error: error.message });
  }
});

// Get single package by ID
router.get('/id/:id', async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id).lean();
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.set('Cache-Control', 'public, max-age=3600');
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching package', error: error.message });
  }
});

// Get packages by country
router.get('/:country', async (req, res) => {
  try {
    const packages = await Package.find({ country: new RegExp(req.params.country, 'i') })
      .lean()
      .select('title country description image rating reviewCount packageType category duration pricing');
    res.set('Cache-Control', 'public, max-age=3600');
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching country packages', error: error.message });
  }
});

// Create package (Admin)
router.post('/', verifyToken, async (req, res) => {
  try {
    const pkg = new Package(req.body);
    const saved = await pkg.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error creating package', error: error.message });
  }
});

// Update package (Admin)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Package not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating package', error: error.message });
  }
});

// Delete package (Admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package', error: error.message });
  }
});

export default router;
