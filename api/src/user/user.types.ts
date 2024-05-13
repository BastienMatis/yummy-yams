import mongoose from "mongoose";


export type UserCreate = {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    username: string;
};

export type UserDelete = {
    _id: mongoose.Types.ObjectId;
}

export type UserReadOne = {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
}