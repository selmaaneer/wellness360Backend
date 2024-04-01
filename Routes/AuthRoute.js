const { Signup, Login } = require('../Controllers/AuthController')
const router = require('express').Router()
const { userVerification } = require('../Middlewares/AuthMiddleware');
const User= require('../models/UserModel');
const bcrypt = require('bcryptjs');


router.post('/signup', async (req, res) => {
    const { username, email, password, age, gender, profilePicture,createdAt } = req.body;
  
    try {
      // Check if user with given email already exists
      let user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create new user instance
      user = new User({
        username,
        email,
        password,
        age, 
        gender, 
        profilePicture,
        createdAt
      });
  
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save user to database
      await user.save();
  
      res.json({ msg: 'User created successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
router.post('/login', Login)
router.post('/user', userVerification)


module.exports = router
