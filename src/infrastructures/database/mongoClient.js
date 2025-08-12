const mongoose = require("mongoose");
const Configs = require("../../configs/env")

let isConnected = null;

const connectMongo = async () => {
  if (isConnected) {
    console.log("📌 MongoDB đã kết nối (tái sử dụng connection).");
    return mongoose.connection;
  }

  const mongoUri = Configs.mongoURI;

  if (!mongoUri) {
    throw new Error("❌ MONGO_URI chưa được cấu hình trong environment variables.");
  }

  try {
    const db = await mongoose.connect(mongoUri);

    isConnected = db.connections[0].readyState;
    // console.log("✅ Kết nối MongoDB thành công");
    return db;
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error);
    throw error;
  }
};

module.exports = connectMongo;
