import bcrypt from 'bcryptjs';
import jwt, { VerifyOptions } from 'jsonwebtoken'
import fs from 'fs';

const privateKey = fs.readFileSync('./key/private.key', 'utf8');
const publicKey = fs.readFileSync('./key/public.key', 'utf8');
const jwtExpires = '24h'
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

export default { hashPassword, comparePassword, signToken }