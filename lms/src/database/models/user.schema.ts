import mongoose, { Schema } from "mongoose";

enum Role {
  Students = "students",
  Admin = "admin",
}

interface IUser extends Document {
  username: String;
  profileImage: String;
  email: String;
  role: Role;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    reqired: true,
  },
  role: {
    type: String,
    enum: [Role.Admin, Role.Students],
    defult: Role.Students,
  },
  profileImage: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
