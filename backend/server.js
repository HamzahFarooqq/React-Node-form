import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import cors from 'cors';
import crypto from 'crypto';



const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;




// middleware
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);




// Connect to MongoDB
mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB');
    // console.log(crypto.randomBytes(32).toString('hex'));
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});









app.listen(port, ()=>{
    console.log(`your server is running on port: ${port}`)
})