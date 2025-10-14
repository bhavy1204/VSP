import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionStatus = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}?retryWrites=true&w=majority`)
        console.log("Db connected. DB Host=> " + connectionStatus.connection.host);
    } catch (error) {
        console.log("MongoDB Connction error =>" + error);
        process.exit(1);
    }
}
export default connectDB;