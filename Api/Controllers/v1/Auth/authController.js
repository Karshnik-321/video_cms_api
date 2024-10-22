// controllers/authController.js
const imp_import = require("../index");
const User = imp_import.db.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../../config/config.json'); 
module.exports = {  
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            console.log('Is valid password:', isValidPassword);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

           
            return res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role,
                    token:user.token
                }
            });
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    register: async (req, res) => {
        const { first_name, last_name, email, password,role } = req.body;

      
        if (!first_name || !last_name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

           
            const token = jwt.sign(
                {role:role },
                JWT_SECRET,  
            );
            
            const newUser = await User.create({
                first_name,
                last_name,
                email,
                password: password,
                role: role,
                token:token
            });

            return res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: newUser.id,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    email: newUser.email,
                    role: newUser.role,
                },
            });
        } catch (error) {
            console.error('Error in user registration:', error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    updateUser: async (req, res) => {
        const userId = req.params.id; 
        const { first_name, last_name, email, password, role } = req.body;
        if (!first_name && !last_name && !email && !password && !role) {
            return res.status(400).json({ message: 'At least one field is required to update' });
        }
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const updateData = {};
            if (first_name) updateData.first_name = first_name;
            if (last_name) updateData.last_name = last_name;
            // if (email) updateData.email = email;
            if (role) updateData.role = role;
            if (password) {
                updateData.password = await bcrypt.hash(password, 10);
            }
            await user.update(updateData);
            return res.status(200).json({
                message: 'User updated successfully',
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (error) {
            console.error('Error in user update:', error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
};
