import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';


dotenv.config();

const app = express();

//Middleware for handling CORS POLICY
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.use(express.json());


const PORT = process.env.PORT || 5555;

app.get('/',(req,res) => {
    console.log(req);
    return res.status(200).send("Welcome To MERN Stack")
});

app.use('/books', booksRoute);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('App connected to database');

    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });

}).catch((error) => {
    console.log(error)
});
