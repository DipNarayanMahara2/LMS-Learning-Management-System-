import { EnrollmentStatus } from "@/database/models/enrollment.schema";
import { Status } from "../category/types";

interface IStudent{
  _id: string,
  username: string,
  email: string,
}

interface ICoures {
  _id: string;
  title: string;
  price: number;
}

export interface IEnrollment {
  _id: string;
  student: IStudent;
  course: ICoures;
  enrolledAt: string;
  enrollmentStatus: EnrollmentStatus;
  whatsapp: string;
}

export interface IInitialData {
  status: Status;
  enrollments: IEnrollment[];
}
