import express from "express"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import connectDB from "./database/db.js"
import cors from "cors"
import  userRouter  from "./router/userRouter.js"
import userPasswordRouter from "./router/passwordRouter.js"
dotenv.config()


const PORT = process.env.PORT || 3000 

const app = express()
app.use(cookieParser())
app.use(express.json())


app.use(cors({
    origin: [
        "https://passmanager36.netlify.app/"
        
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add this
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Add this
    credentials: true
}))



app.use("/api/user", userRouter)
app.use("/api/password", userPasswordRouter)
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`✅ Server running on http://localhost:${PORT}`)
    })
}).catch(err => {
    console.error('❌ Failed to connect to database:', err)
})

