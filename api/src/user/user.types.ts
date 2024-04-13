import mongoose from "mongoose";


export type UserCreate = {
    email: String;
    password: String;
    username: String;
};

export type UserDelete = {
    _id: mongoose.Types.ObjectId;
}

export type UserRead = {
    _id: mongoose.Types.ObjectId;
    email: String;
    password: String;
}