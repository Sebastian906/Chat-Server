import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';
import contactsRoutes from './routes/ContactRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL;

app.use(
    cors({
        origin: [process.env.ORIGIN],
        methods: ["GET","POST","PUT","PATCH","DELETE"],
        credentials: true,
    })
);

app.use('/uploads/profiles', express.static('uploads/profiles'));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);

const server = app.listen(port,()=> {
    console.log(`El servidor esta corriendo en el puerto: http://localhost:${port}`);
});

mongoose
.connect(databaseUrl)
.then(()=>console.log('Conexión a la base de datos exitosa.'))
.catch(err=>console.log(err,message));