import mongoose, { Schema } from "mongoose";
import PaymentEntity from "../../entity/paymentEntity";

const paymentSchema = new Schema(
  {
    tokenId: {
      type: mongoose.Types.ObjectId,
    },
    doctorId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
    },
    amount: {
      type: Number,
    },
    paymentMethod:{
      type:String,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model<PaymentEntity>("Payment", paymentSchema);

export default Payment;
