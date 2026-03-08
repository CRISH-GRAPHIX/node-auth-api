const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET users
exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// CREATE user
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'name, email and password are required' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email
  });
};

// UPDATE user
exports.updateUser = async (req, res) => {
  const update = {};
  if (req.body.name) update.name = req.body.name;
  if (req.body.email) update.email = req.body.email;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true }
  );

  res.json(user);
};

// DELETE user
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({ msg: 'User deleted successfully' });
};
