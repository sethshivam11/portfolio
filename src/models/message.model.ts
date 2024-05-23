import mongoose, { Schema } from "mongoose";

interface Message {
  name: string;
  email: string;
  message: string;
  phone?: number;
}

const messageSchema: Schema<Message> = new Schema(
  {
    name: { type: String, require: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    message: { type: String, required: [true, "Message is required"] },
    phone: Number,
  },
  {
    timestamps: true,
  }
);

export const MessageModel =
  (mongoose.models.Message as mongoose.Model<Message>) ||
  mongoose.model<Message>("Message", messageSchema);
