import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://karanbakshi005_db_user:Friends1234@cluster0.s6qnhiw.mongodb.net/Expense",
    );
    console.log("DB CONNECTED");
  } catch (error) {
    console.log(error);
  }
  // .then(() => console.log("DB CONNECTED") );
};
