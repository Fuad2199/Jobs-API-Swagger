import express from "express";
import {} from "dotenv/config"
const app = express()

// routers
import authRouter from "./routes/auth"

//middleware
app.use(express.json())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        app.listen(port, () => 
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error)
    }
}

start();