import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {AppointemntRouter as appointmentRoutes} from './routes/appointmentRoutes';
import {AuthRouter} from './routes/authRoutes';
import { Request, Response } from 'express';

const port = 3000;
const app = express();

//Middlewares:
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));

//Routes:
app.get('/api', (req: Request, res: Response) => {res.send("API Working")});
app.use('/api', appointmentRoutes);
app.use('/api', AuthRouter);


app.listen(port, () =>{
    console.log(`Server listening on port: ${port}`);
})

