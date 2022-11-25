import bcrypt from 'bcryptjs';
import jwt, { VerifyOptions } from 'jsonwebtoken'
import fs from 'fs';

const privateKey = fs.readFileSync('./key/private.key', 'utf8');
const publicKey = fs.readFileSync('./key/public.key', 'utf8');
const jwtExpires = 86400
const jwtAlgorithm = "RS256";


type Token = { 
    userId: number
}

function hashPassword(password:string){
    return bcrypt.hashSync(password, 8);
}

function comparePassword(password:string, hashPassword:string) {
    return bcrypt.compareSync(password, hashPassword);
}

function signToken(userId: number){
    const token : Token = {userId};
    return jwt.sign(token, privateKey, { expiresIn: jwtExpires, algorithm: jwtAlgorithm });
}

async function verifyToken(token: string){
    try {
        const decodedToken : Token = await jwt.verify(token, publicKey, { algorithm: [jwtAlgorithm] } as VerifyOptions) as Token;
        return { userId: decodedToken.userId };
    } catch (error) {
        console.log(`verify: ${error}`);
        return null;
    }
}

export default { hashPassword, comparePassword, signToken, verifyToken }