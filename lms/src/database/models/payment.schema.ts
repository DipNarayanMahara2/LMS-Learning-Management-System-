import mongoose, { Schema } from "mongoose";
import { ST } from "next/dist/shared/lib/utils";
import Enrollment, { EnrollmentStatus } from "./enrollment.schema";

enum Status {
  completed = "Completed",
  pending = "Pending",
  failed = "failed",
}

interface IPayment extends Document {
  enrollment: mongoose.Types.ObjectId;
  amount: number;
  status: Status;
  paymentMethod : PaymentMethod,
}

export enum PaymentMethod {
  khalti = "Khalti",
  Esewa = "Esewa",
}

const paymentSchema = new Schema<IPayment>({
  enrollment:{
    type: Schema.Types.ObjectId,
    ref : "Enrollment"
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
  paymentMethod:{
    type: String,
    enum : [PaymentMethod.Esewa, PaymentMethod.khalti],
    default : PaymentMethod.Esewa
  }
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
