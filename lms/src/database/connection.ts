import mongoose from "mongoose";

const MONGODB_CS = process.env.MONGODB_CS;

if (!MONGODB_CS) {
  throw Error("You have to provide Mongodb connection string!!");
}

const dbConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Database is already connceted");
    return;
  }

  try {
    await mongoose.connect(MONGODB_CS);
    console.log("Database is connected successfully........🥰🥰🥰🥰`");
  } catch (error) {
    console.log("Error connecting............😭😭😭😭😭", error);
  }
};

export default dbConnect;
