import { UserModel } from "../models/user";
import { UserCreate, UserDelete, UserRead } from "./user.types";
import { type Request, type Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import SECRET from "./user.secret";

dotenv.config();

export async function createUser(
    req: Request,
    res: Response,
): Promise<void> {
    try {
        const userData: UserCreate = req.body

        const existingUser = await UserModel.findOne(
            {
                email: userData.email
            }
        )

        if (existingUser) {
            res.status(400).json({ message: 'Email already exists' });
            return
        }

        const hashed = await hashedPassword(userData.password);

        const user = await UserModel.create(
            {
                ...userData,

                password: hashed,
                turn: 3,
                price: 0
            }
        );
        const token = jwt.sign({ userId: user._id }, SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Error registering user' });
    }
};

async function hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}

export async function getOneUser(
    req: Request,
    res: Response,
): Promise<void> {
    try {
        const userData: UserRead = req.body

        const user = await UserModel.findOne(
            {
                email: userData.email,
            }
        )

        if (user) {
            const passwordMatch = await bcrypt.compare(userData.password, user.password);
            if (!passwordMatch) {
                res.status(401).json({ message: 'Invalid password' });
            }
        }

        const token = jwt.sign({ userId: user?._id }, SECRET, {
            expiresIn: '1h',
        });

        console.log('erhjgf', token)
        res.status(200).json({ user: user, token: token });
    } catch (err) {
        console.error('Error signing in:', err);
        res.status(500).json({ message: 'Error signing in', err });
    }
}

export async function getAllWinners(
    req: Request,
    res: Response,
): Promise<void> {
    try {
        const userData: UserRead = req.body

        const users = await UserModel.find(
            {
                ...userData,
                price: { $gt: 0 }
            }
        )

        if (!users) {
            res.status(404).json({ message: 'Winners not found' });
        }

        res.status(200).json(users);
    } catch (err) {
        console.error('Error getting winners:', err);
        res.status(500).json({ message: 'Error getting winners', err });
    }
}

export async function deleteUser(
    req: Request<{ userData: UserDelete }>,
    res: Response,
): Promise<void> {
    try {
        const { userData } = req.body

        const user = await UserModel.findOneAndDelete(
            {
                _id: userData._id
            }
        )


        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: "User successfully deleted" })
    } catch (err) {
        console.log({ err }, "Cannot delete user")
    }
}