import { UserModel, UserType } from "../models/user";
import { UserCreate, UserDelete, UserReadOne } from "./user.types";
import type { ClientSession } from "mongodb";
import { type Request, type Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export async function createUser(
    req: Request<{ userData: UserCreate }>,
    res: Response,
): Promise<void> {
    try {
        const { userData } = req.body

        const existingUser = await UserModel.findOne(
            {
                email: userData.email
            }
        )

        if (existingUser) {
            res.status(400).json({ message: 'Email already exists' });
        }

        const [user] = await UserModel.create(
            [
                {
                    ...userData,

                    password: hashedPassword(userData.password)
                }
            ],
        );
        const token = jwt.sign({ userId: user._id }, process.env.JWT || '', {
            expiresIn: '1h',
        });
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Error registering user' });
    }
};

async function hashedPassword(password: string) {
    await bcrypt.hash(password, 10);
}

export async function getOneUser(
    req: Request<{ userData: UserReadOne }>,
    res: Response,
): Promise<void> {
    try {
        const { userData } = req.body

        const user = await UserModel.findOne(
            {
                email: userData.email,
                password: userData.password
            }
        )

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

    }
}


async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(req.body)

    try {
        const user = await User.findOne({ email });
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
            expiresIn: '1h',
        });

        res.status(200).json({ user, token });
    } catch (error) {
        console.error('Error registering user:', error); // Afficher l'erreur dans la console
        res.status(500).json({ message: 'Error registering user', error }); // Envoyer l'erreur dans la réponse
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
            },
        )


        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: "User successfully deleted" })
    } catch (err) {
        console.log({ err }, "Cannot delete user")
    }
}

// export async function createUser(
//     userData: UserCreate,
//     session: ClientSession,
// ): Promise<UserType> {
//     const [user] = await UserModel.create(
//         [
//             {
//                 ...userData,
//             },
//         ],
//         { session, new: true },
//     );

//     return user;
// }


// export async function deleteUser(
//     userData: UserDelete,
//     session: ClientSession,
// ): Promise<UserType | null> {
//     const user = await UserModel.findOneAndDelete(
//         {
//             _id: userData
//         },
//         { session, new: true },
//     )

//     return user
// }
