import mongoose, { InferSchemaType, Schema, Types } from "mongoose";
const userSchema = new Schema(
  {

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    turn: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true, }
);

export type UserType = InferSchemaType<typeof userSchema> & {
  _id: Types.ObjectId;
};
export type UserDocument = UserType & mongoose.Document;

export const UserModel = mongoose.model("User", userSchema, "users");

