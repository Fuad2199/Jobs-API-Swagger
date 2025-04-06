import express from "express";
import "express-async-errors"; 
import {} from "dotenv/config";
import connectDB from "./db/connect.js";
import authRouter from "./routes/auth.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import cors from 'cors';

const app = express();

//=============== Middleware Setup starts =================
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
//=============== Middleware Setup ends =================

//=============== API Routes Setup starts =================
app.use('/api/v1/auth', authRouter); // Authentication routes
//=============== API Routes Setup ends =================

//=============== Error Handling Middleware starts =================
app.use(notFoundMiddleware); // 404 handler
app.use(errorHandlerMiddleware); // Global error handler
//=============== Error Handling Middleware ends =================

const port = process.env.PORT || 3000;

//=============== Server Start and DB Connection starts =================
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI); 
        app.listen(port, () => 
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error); // Log errors
    }
};

start(); // Start the server
//=============== Server Start and DB Connection ends =================
