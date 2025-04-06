import express from "express";
import "express-async-errors";
import {} from "dotenv/config";

// connect database
import connectDB from "./db/connect.js";

// connect controller auth.js
import authRouter from "./routes/auth.js"
import notFoundMiddleware from "./middleware/not-found.js" 
import errorHandlerMiddleware from "./middleware/error-handler.js";
import cors from 'cors';
const app = express()

//middleware
app.use(express.json())
app.use(cors())

// routes
app.use('/api/v1/auth', authRouter)
// app.use('/api/v1/jobs', jobsRouter)

//middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => 
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error)
    }
}

start();