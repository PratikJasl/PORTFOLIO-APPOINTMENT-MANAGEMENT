import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {AppointemntRouter as appointmentRoutes} from './routes/appointmentRoutes';
import {AuthRouter} from './routes/authRoutes';

const port = 3000;
const app = express();

//Middlewares:
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));

//Routes:
app.use('/api', appointmentRoutes);
app.use('/api', AuthRouter);


app.listen(port, () =>{
    console.log(`Server listening on port: ${port}`);
})

