import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const auth= async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','');
        console.log(token);
        const decoded=jwt.verify(token,pocess.env.JWT_SECRET);
        const user=await db.User.findByPk(decoded.id);
        if(!user){
            throw new Error();
        }
        req.token=token;
        req.user=user;
        next();
    }
    catch(err){
        res.status(401).send({err:"Pls authenticate"})
    }

};
export default auth;