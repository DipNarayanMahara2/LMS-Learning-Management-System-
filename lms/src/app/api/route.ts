import dbConnect from "@/database/connection";
import User from "@/database/models/user.schema";

export async function GET() {
  dbConnect();

  await User.create({
    email: "dipakmahara27@gmail.com",
    username: "dipak",
    googleId: "12423487879234",
    profileImage: "thisisimage",
  });

  return Response.json({
    message: "you hit api route......",
  });
}
