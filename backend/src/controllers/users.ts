import repository from '../models/users-model';
import accountsControllers from './accounts'
import {Request, Response} from 'express';
import { IUser } from '../models/users'
import auth from '../auth'

function validator(password:any){
    const validator = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,20}$")
    if(!validator.test(password)){   
        return false
    }else {
        return true
    }
    
}

async function getByAccountId(req:Request, res:Response){
    try {
        const account = parseInt(req.params.accountId)
        if(!account) throw new Error('ID is in invalid format.')

        const result = await repository.findAccountId(account)

        res.status(200).json(result)

    } catch (error) {
        res.status(400).json(error)
    }

}


async function addUser(req:Request, res:Response){
    try {
        const userName = req.body.username
        const validt = validator(req.body.password)
        const getResult = await getUser(req, res, userName)
        if(getResult){
            res.send(400).json('Usuário já está em uso')
            console.log('Usuário já está em uso')

        } else if(!validt){
            console.log('Password invalid')
            res.status(400).json('Password deve conter no minimo 1 letra maiúscula, 1 minúscula, 1 número e um caractere especial')   
            
        }else {
            const user = req.body as IUser
            user.password = auth.hashPassword(user.password)
            const idAccount = await accountsControllers.addAccount(req,res)
            user.accountId = idAccount.id

            const result = await repository.add(user)
            user.id = result.id
            //user.password = ''
            
            res.status(201).json(user)
            console.log(user)
        }


        

    } catch (error) {
        res.status(400).json(error)
    }
}

async function getUser(req:Request, res:Response, username: string){
    try {
        const user = username

        const result = await repository.findUser(user)
        return result
        
    } catch (error) {
        res.status(400).json(error)
    }
}

async function getUserByName(req:Request, res:Response){
    try {
        const user = req.body.username

        const result = await repository.findUser(user)
        res.status(200).json(result)
        
    } catch (error) {
        res.status(400).json(error)
    }
}
async function loginUser(req:Request, res:Response, next:any) {
    try{
        const loginParams = req.body as IUser;
        const user = await repository.findUser(loginParams.username);
        
        if(user !== null){
            const isValid = auth.comparePassword(loginParams.password, user.password);
            if(isValid){
                const token = await auth.signToken(user.id!);
                return res.json({ auth: true, token, id: user.id, name: user.username });
            }
        }
        return res.status(401).end();
    }
    catch(error){
        console.log(error);
        res.status(400).end();
    }
}

export default {addUser, getUser, loginUser, getByAccountId, getUserByName}