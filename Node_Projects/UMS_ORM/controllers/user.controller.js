const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const userService = require('../services/user.services');

const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await userService.createUser(req.body, req.file.filename);
        return res.status(201).json({
            message: "User Created Successfully",
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const verifyMail = async (req, res) => {
    try {
        await userService.verifyUserEmail(req.query.token);
        return res.render('mail_verification', {
            message: "Email Verified Successfully"
        });
    } catch (error) {
        return res.render('Not_Found');
    }
};

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await userService.loginUser(req.body.email, req.body.password);
        const token = jwt.sign(
            { id: user.id, is_admin: user.is_admin },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: "Login Successfully",
            token,
            user
        });
    } catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
};

const getUser = async (req, res) => {
    try {
        const authtoken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(authtoken, JWT_SECRET);
        const user = await userService.getUserById(decoded.id);

        return res.status(200).json({
            message: "User Fetched Successfully!",
            user,
            isAdmin: decoded.is_admin,
            success: true
        });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await userService.initiatePasswordReset(req.body.email);
        return res.status(200).json({
            message: "Email Sent Successfully for Password Reset"
        });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

const resetPasswordLoad = async (req, res) => {
    try {
        if (!req.query.token) {
            return res.render('Not_Found');
        }

        const { user, token } = await userService.verifyResetToken(req.query.token);
        return res.render('reset_password', {
            user,
            token,
            message: "Reset Password",
            email: user.email
        });
    } catch (error) {
        return res.render('Not_Found');
    }
};

const resetPassword = async (req, res) => {
    try {
        if (!req.body || !req.body.password || !req.body.confirm_password) {
            return res.status(400).json({
                message: "Password and confirm password are required"
            });
        }

        const { password, confirm_password, user_id, email } = req.body;
        if (password !== confirm_password) {
            return res.render('reset_password', {
                error_message: "Password is Not Matching",
                user: { id: user_id, email }
            });
        }

        await userService.resetUserPassword(user_id, email, confirm_password);
        return res.render('message', {
            message: "Password Reset Successfully"
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const updateData = {
            name: req.body.name,
            email: req.body.email
        };

        if (req.file) {
            updateData.image = 'images/' + req.file.filename;
        }

        await userService.updateUserProfile(decoded.id, updateData);
        return res.status(200).json({
            message: "Profile Updated Successfully"
        });
    } catch (error) {
        return res.status(400).json({ errors: error.message });
    }
};

module.exports = {
    register,
    verifyMail,
    login,
    getUser,
    forgotPassword,
    resetPasswordLoad,
    resetPassword,
    updateProfile
};