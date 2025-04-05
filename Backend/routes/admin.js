const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const StudentRegistration = require('../models/StudentRegistration');
const User = require('../models/User');

// GET /api/admin/users - list all registered users (or their registration entries)
router.get('/users', auth, async (req, res) => {
  try {
    // Optionally check if req.user.role === 'admin'
    if(req.user.role !== 'admin'){
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/admin/users/:id - get a user's registration details
router.get('/users/:id', auth, async (req, res) => {
  try {
    if(req.user.role !== 'admin'){
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    const registration = await StudentRegistration.findOne({ user: req.params.id });
    if(!registration){
      return res.status(404).json({ msg: 'Registration details not found' });
    }
    res.json(registration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
