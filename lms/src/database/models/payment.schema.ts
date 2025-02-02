import mongoose, { Schema } from "mongoose";
import { ST } from "next/dist/shared/lib/utils";

enum Status {
  completed = "Completed",
  pending = "Pending",
  failed = "failed",
}

interface IPayment extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  amount: number;
  status: Status;
}

const paymentSchema = new Schema<IPayment>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [Status.completed, Status.pending, Status.failed],
    default: Status.pending,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
