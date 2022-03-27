import mongoose from "mongoose";

const connection = {};

const connect = async () => {
  if (connection.isConnected) {
    console.log("alreadly connected");
    return;
  }
  console.log(mongoose.connection)
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  // Connect
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log("new connection");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("mongodb error: ", error);
  }
};

const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
};

const db = { connect, disconnect };
export default db;
