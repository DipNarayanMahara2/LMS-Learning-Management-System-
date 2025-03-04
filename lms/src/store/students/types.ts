import { Role } from "@/database/models/user.schema";
import { Status } from "../category/types";

export interface IStudent {
  _id: string,
  username: string;
  profileImg: string;
  email: string;
  role: Role;
}

export interface IInitialData {
  status: Status;
  students: IStudent[];
}
