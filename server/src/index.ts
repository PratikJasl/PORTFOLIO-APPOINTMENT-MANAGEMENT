import express from 'express';
import {router as appointmentRoutes} from './routes/appointmentRoutes';

const port = 3000;
const app = express();

//Middlewares:
app.use(express.json());

//Routes:
app.use('/api', appointmentRoutes);

app.listen(port, () =>{
    console.log(`Server listening on port: ${port}`);
})

