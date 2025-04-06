import mongoose from "mongoose";

//=============== MongoDB URI Setup starts =================
const MONGO_URI = process.env.MONGO_URI; // Get MongoDB URI from environment variables
//=============== MongoDB URI Setup ends =================

//=============== Database Connection starts =================
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to DB"); // Log success message on successful connection
    } catch (error) {
        // If connection fails, log the error and exit the process
        console.error("Could not connect to DB", error);
        process.exit(1); // Exit the process with error code 1
    }
};
//=============== Database Connection ends =================

export default connectDB; // Export the connectDB function for use in other parts of the app
