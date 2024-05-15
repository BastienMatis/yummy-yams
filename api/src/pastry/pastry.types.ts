import mongoose from "mongoose";

export type PastryRead = {
    _id: mongoose.Types.ObjectId;
    name: string;
    stock: number;
    quantityWon: number;
}

export type PastryUpdate = {
    name: string;
    stock: number;
    quantityWon: number;
}