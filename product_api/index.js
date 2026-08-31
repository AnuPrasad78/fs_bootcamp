import express from 'express';
import productRoutes from './routes/productRoutes.js'
import pool from './config/db.js';

const app=express();
const PORT=8090;

//middleware
app.use(express.json());

//routes
app.use('/',productRoutes);
// app.use('/',(req,res)=>{
//     res.send("hello world")
// });


app.listen(PORT,async()=>{
    try{
        const connection=await pool.getConnection();
        connection.release();
        console.log(`server running at http://localhost:${PORT}`)
    }catch(error){
        console.log(`failed to connect ${error.message}`)

    }
})
// app.listen(PORT,()=>{console.log(`server running at http://localhost:${PORT}`)})