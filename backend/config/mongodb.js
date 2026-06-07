import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );

    await mongoose.connect(process.env.MONGODB_URI, {
      family: 4
    });

  } catch (error) {
    console.log("MongoDB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;