import mongoose, { Schema } from "mongoose";

const gameWonSchema = new Schema(
  {
    user: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    victoryDate: {
      type: Date,
      required: true,
    }
  }
)

const pastrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    quantityWon: {
      type: Number,
      required: true,
    },
    gameWon: {
      type: [gameWonSchema],
    }
  },
);

export const userModel = mongoose.model("Pastry", pastrySchema, "pastries");