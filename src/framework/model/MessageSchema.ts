import mongoose, { Mongoose, Schema } from "mongoose";
import MessageEntity from "../../entity/messageEntity";

const messageSchema: Schema = new Schema(
  {
    conversationId:{
      type:Schema.Types.ObjectId,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<MessageEntity>("Message", messageSchema);

export default Message;
