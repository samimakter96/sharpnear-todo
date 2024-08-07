import mongoose from "mongoose";

// Define an asynchronous function to connect to the MongoDB database
export const ConnectDB = async () => {
  // Connect to the MongoDB database using the connection string from the environment variable
  await mongoose.connect(process.env.MONGODB_URI);

  // Log a message to the console indicating that the database connection was successful
  console.log("database connected");
};
