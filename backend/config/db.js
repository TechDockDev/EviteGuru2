import mongoose, { mongo } from "mongoose";
import Grid from "gridfs";
import { Db } from "mongodb";
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //gfs initialization code
    const gfs = new Grid(Db, mongo);
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.bold.underline
    );
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDb;
