import mongoose from "mongoose";

export const ConnectDB = async () => {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("database connected");
};
