/* eslint-disable indent */
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/user';

// Login as an Administrator
export async function adminLogin(req, res) {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database and has the role of 'admin'
        const user = await User.findOne({ where: { email, role: 'admin' } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create a JSON Web Token (JWT) to authenticate the user
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
        );

        // Return the JWT as a response to the client
        res.status(200).json({ token, userId: user.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Login as a Vendor
export async function vendorLogin(req, res) {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database and has the role of 'vendor'
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create a JSON Web Token (JWT) to authenticate the user
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
        );

        // Return the JWT as a response to the client
        return res.status(200).json({
            status: 200, message: ' loged in successfully', data: user, token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Login as a Buyer with email confirmation
export async function buyerLogin(req, res) {
    const { email } = req.body;

    try {
        // Check if the user exists in the database and has the role of 'buyer'
        const user = await User.findOne({ where: { email, role: 'buyer' } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create a confirmation token for the user
        const confirmationToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
        );

        // Send the confirmation email to the user's email address
        // Here, you can use a third-party library like Nodemailer to send the email

        //
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

    // Send the confirmation email to the user's email address
    // Here, you can use a third-party library like Nodemailer to send the email
