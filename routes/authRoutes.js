// const express = require('express');
// const router = express.Router();

// const protect = require('../middleware/authMiddleware');

// const { deleteUser } = require('../controllers/userController');

// router.delete('/:id', protect, deleteUser);

// module.exports = router;


const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getMe } = require('../controllers/authController');

const protect = require ('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe)

module.exports = router;
