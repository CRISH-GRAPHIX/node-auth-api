const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
const JWT_SECRET = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
   try {
      const {name, email, password} =  req.body;
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
         id: user._id,
         name: user.name,
         email: user.email
      });
   } catch (error) {
      res.status(500).json({ msg: error.message });
   }
};

      exports.loginUser = async (req, res) => {
         try {

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if(!user) {
               return res.status(400).json({ msg: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
               return res.status(400).json({ msg: 'Invalid password'});
            }

            const token = jwt.sign(
               { id: user._id, role: user.role },
               JWT_SECRET,
               { expiresIn: '1h' }
            );

            res.json({ token });

         } catch (error) {
            res.status(500).json({ msg: error.message })
         }
      };

      exports.getMe = async (req, res) => {
         try{

            const user = await User.findById(req.user.id).select('-password -__v');

            if (!user) {
               return res.status(404).json({ msg: 'User not found' });
            }

            res.json(user);

         } catch (error) {
            res.status(500).json({ msg: error.message });
         }
      };



   
