import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    members: [
      {
        doctorId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Doctor",
        },
        userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation=mongoose.model("Coversation",conversationSchema)
export default Conversation
