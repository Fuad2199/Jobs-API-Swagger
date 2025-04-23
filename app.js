import express from "express";
import "express-async-errors"; 
import {} from "dotenv/config";
import connectDB from "./src/db/connect.js";
import authRouter from "./src/routes/auth.js";
import jobsRouter from "./src/routes/jobs.js"
import notFoundMiddleware from "./src/middleware/not-found.js";
import errorHandlerMiddleware from "./src/middleware/error-handler.js";
import cors from 'cors';
import authenticationUser from "./src/middleware/authentication.js"
// Extra security packages
import helmet from "helmet";
import xss from "xss-clean"
import rateLimit from "express-rate-limit";

const app = express();


//=============== MIDDLEWARE SETUP STARTS =================
app.use(express.json()); // Parse JSON requests
app.use(helmet());
app.use(cors()); // Enable CORS
app.use
//=============== MIDDLEWARE SETUP ENDS =================

//=============== API ROUTES SETUP STARTS =================
app.use('/api/v1/auth', authRouter); // Authentication routes
app.use('/api/v1/jobs', authenticationUser, jobsRouter); // Authentication routes
//=============== API ROUTES SETUP ENDS =================

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
