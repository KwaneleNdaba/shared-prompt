import mongoose from "mongoose";

let isConnected = false; //track the connection state

export const connectToDb = async () => {

    mongoose.set("strictQuery", true);

    if(isConnected) {
        console.log("Database is already connected")
        return;
    }

try {
    await mongoose.connect(process.env.MONGODB_URI, {//options
        dbName : "shared_prompt",
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    isConnected = true; //
    console.log("Database is connected")
} catch (error) {
    console.log(error)
}

}