import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './models/index.js';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';

const app=express();
const PORT=8090;
//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth',authRoutes);
app.use('/api/events',eventRoutes);


app.use('/',(req,res)=>{
    res.send("hello world");

}
);
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.send(500).send('something broke')
});

db.sequelize.sync().then(()=>{
    console.log("db Connected ");
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    })
});