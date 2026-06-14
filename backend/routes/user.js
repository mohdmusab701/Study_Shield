const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/:id', protect, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this user profile.' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this user profile.' });
    }

    // Only allow updating standard profile fields to prevent privilege escalation or data corruption
    const { name, email, password } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    
    let user;
    if (password) {
      // Fetch user to trigger password pre-save middleware hashing
      user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password;
      await user.save();
    } else {
      user = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
