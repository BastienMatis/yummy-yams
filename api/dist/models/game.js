import mongoose, { Schema } from "mongoose";
import { gameKinds } from "../constants/game.constants";
const turnSchema = new Schema({
    turn: {
        type: String,
        enum: Object.values(gameKinds),
    },
    user: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    }
});
const gameSchema = new Schema({
    score: {
        type: Number,
        required: true,
    },
    turn: {
        type: [turnSchema],
        description: 'Le tour du joueur qui dans le front devra se lock à partir de 3'
    },
    isYams: {
        type: Boolean,
        required: true
    },
    isCarre: {
        type: Boolean,
        required: true
    },
    isDouble: {
        type: Boolean,
        required: true
    },
});
export const GameModel = mongoose.model("Game", gameSchema, "games");
