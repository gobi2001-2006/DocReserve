import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 4000

// DB + Cloudinary
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors({
  origin: "*", // for now (later restrict)
}));

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

// Routes
app.use('/api/admin', adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user', userRouter)
app.get('/', (req, res) => {
    res.send('API WORKING')
})
app.get("/healthz", (req, res) => {
  res.send("OK");
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ success: false, message: "Server Error" })
})

// Server
app.listen(port, () => console.log("server started", port))