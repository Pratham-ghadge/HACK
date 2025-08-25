import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authrouter from './Routes/auth-route.js';
import errormiddlewares from './middlewares/error-middlewares.js';
import contactrouter from './Routes/contact-route.js';
import adminrouter from './Routes/admin-route.js';
const app = express();
import cors from 'cors';

import http from 'http';
import { Server } from 'socket.io';


const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('user-message', (msg) => {
    io.emit('admin-message', msg);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});




var corsOptions = {
    origin: '*',
    methods:"POST, GET , PUT ,PATCH,DELETE",
    credentials: true 
  }

  app.use(cors(corsOptions));

dotenv.config();

app.use(express.json());
app.use("/api/auth",authrouter);
app.use("/api/form",contactrouter);
app.use("/api/admin",adminrouter);


app.use(errormiddlewares);
const PORT = process.env.PORT;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{
    console.log("Database connected..")
}).catch(err => console.error(err))




app.listen(PORT,()=>{
    console.log(`YOUR APPLICATION IS RUNNING ON :- http://localhost:${PORT} `)
})
