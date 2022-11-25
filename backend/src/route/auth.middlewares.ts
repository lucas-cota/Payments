import auth from '../auth'
import {Request, Response} from 'express'


async function validateAuth(req: Request, res:Response, next:any){
    try {
        const token = req.headers['x-access-token'] as string;
        if(!token) return res.status(401).end();
        console.log('Middleware',token)
        const payload = await auth.verifyToken(token);
        
        if(!payload) return res.status(401).end();

        res.locals.payload = payload;

        next();
        
    } catch (error) {
        console.log(`validateAuth: ${error}`);
        res.status(400).end();
    }
}

export default {validateAuth}