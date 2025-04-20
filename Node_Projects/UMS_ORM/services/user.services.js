const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const PasswordReset = require("../models/passwordReset.model");
const randomString = require('randomstring');
const sendMail = require("../helpers/sendMail");

class UserService {
    async createUser(userData, filename) {
        const existingUser = await User.findOne({
            where: { email: userData.email.toLowerCase() }
        });

        if (existingUser) {
            throw new Error("Email Already Exists");
        }

        const hash = await bcrypt.hash(userData.password, 10);
        const randomToken = randomString.generate();

        const user = await User.create({
            name: userData.name,
            email: userData.email.toLowerCase(),
            password: hash,
            image: 'images/' + filename,
            token: randomToken
        });

        let mailSubject = "Verification Email From Griwa Internationals";
        let content = '<p> Hello ' + userData.name + ', \
        Please<a href="http://127.0.0.1:3000/mail_verification?token='+ randomToken + '">Verify</a> Your Email Address.</p>';
        await sendMail(userData.email, mailSubject, content);

        return user;
    }

    async verifyUserEmail(token) {
        const user = await User.findOne({ where: { token } });
        if (!user) {
            throw new Error("Invalid token");
        }

        await user.update({
            token: null,
            is_verified: true
        });
        return user;
    }

    async loginUser(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("Email or Password is Incorrect User Not Found");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error("Email or Password is Incorrect. Password Is Wrong");
        }

        await user.update({ last_login: new Date() });
        return user;
    }

    async getUserById(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("User Not Found");
        }
        return user;
    }

    async initiatePasswordReset(email) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("Email Not Found");
        }

        const randomToken = randomString.generate();
        const mailSubject = "Reset Password Email From Griwa Internationals";
        const content = `<p>Hello ${user.name},
            <p>You have requested a password reset for your account.
            <p>Please click the link below to reset your password:
            <a href="http://127.0.0.1:3000/reset-password?token=${randomToken}">Reset Password</a>
            <p>If you did not request this password reset, please ignore this email.
            <p>Thank you!</p>`;

        await sendMail(user.email, mailSubject, content);
        await PasswordReset.destroy({ where: { email: user.email } });
        await PasswordReset.create({ email: user.email, token: randomToken });

        return true;
    }

    async verifyResetToken(token) {
        const passwordReset = await PasswordReset.findOne({ where: { token } });
        if (!passwordReset) {
            throw new Error("Invalid token");
        }

        const user = await User.findOne({ where: { email: passwordReset.email } });
        if (!user) {
            throw new Error("User not found");
        }

        return { user, token };
    }

    async resetUserPassword(userId, email, password) {
        const hash = await bcrypt.hash(password, 10);
        await PasswordReset.destroy({ where: { email } });
        await User.update({ password: hash }, { where: { id: userId } });
    }

    async updateUserProfile(userId, updateData) {
        await User.update(updateData, { where: { id: userId } });
    }
}

module.exports = new UserService();