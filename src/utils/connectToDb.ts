import mongoose from "mongoose";
import log from "./logger";

async function connectToDb() {
  const dbUri =
    "mongodb+srv://phamthuylinhutt:toan123@doantotnghiep.5xxt9em.mongodb.net/?retryWrites=true&w=majority";
  log.info(dbUri);
  try {
    await mongoose.connect(dbUri);
    console.log('connect success')
  } catch (error) {
      console.log(error)
    process.exit(1);
  }
}

export default connectToDb;
