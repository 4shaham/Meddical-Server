import mongoose, { Schema } from "mongoose";
import ConversationEntity from "../../entity/conversationEntity";

const conversationSchema: Schema = new Schema(
  {
    members:[
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

const Conversation = mongoose.model<ConversationEntity>(
  "Conversation",
  conversationSchema
);

export default Conversation;
