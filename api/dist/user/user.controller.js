import { UserModel } from "../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export async function createUser(req, res) {
    try {
        const userData = req.body;
        const existingUser = await UserModel.findOne({
            email: userData.email
        });
        if (existingUser) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        const hashed = await hashedPassword(userData.password);
        const user = await UserModel.create({
            ...userData,
            password: hashed
        });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
            expiresIn: '1h',
        });
        res.status(201).json({ message: 'User registered successfully', token });
    }
    catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Error registering user' });
    }
}
;
async function hashedPassword(password) {
    return await bcrypt.hash(password, 10);
}
export async function getOneUser(req, res) {
    try {
        const userData = req.body;
        const user = await UserModel.findOne({
            email: userData.email,
            password: userData.password
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        const token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRET || '', {
            expiresIn: '1h',
        });
        res.status(200).json({ user, token });
    }
    catch (err) {
        console.error('Error signing in:', err);
        res.status(500).json({ message: 'Error signing in', err });
    }
}
export async function deleteUser(req, res) {
    try {
        const { userData } = req.body;
        const user = await UserModel.findOneAndDelete({
            _id: userData._id
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: "User successfully deleted" });
    }
    catch (err) {
        console.log({ err }, "Cannot delete user");
    }
}
