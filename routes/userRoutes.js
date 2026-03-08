const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');

const adminOnly = require ('../middleware/adminMiddleware');

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;
