import mongoose from "mongoose";


export type UserCreate = {
    _id: mongoose.Types.ObjectId;
    email: String;
    password: String;
    username: String;
};

export type UserDelete = {
    _id: mongoose.Types.ObjectId;
}

export type UserReadOne = {
    _id: mongoose.Types.ObjectId;
    email: String;
    password: String;
}