import type {Request,Response, NextFunction } from "express";

const auth =()=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
    // console.log("Authenticating user...");
    console.log(req.headers.authorization);
    next();
    }
}

export default auth;