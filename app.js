import express from "express";
import {} from "dotenv/config"
// connect database
import connectDB from "./db/connect.js";
import authRouter from "./routes/auth.js"
const app = express()

// routers

//middleware
app.use(express.json())

// routes
app.use('/api/v1/auth', authRouter)
// app.use('/api/v1/jobs', jobsRouter)

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