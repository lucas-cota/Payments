import {Request, Response} from 'express';
import repository from '../models/transactions-model'
import { ITransaction } from '../models/transactions';
import usersControllers from './users'
import repositoryAccount from '../models/accounts-model'
import accountsControllers from './accounts'
import {IAccount} from '../models/accounts'


async function addTransaction(req:Request, res:Response){
    
    try {
        //Buscar o meu saldo
        const myBalance =  await accountsControllers.getAccountId(req, res, req.body.myAccount)

        //Se saldo for suficiente
        if(myBalance.dataValues.balance >= req.body.value){

            //Pegar usuario que deseja pagar
            const userName:any = await usersControllers.getUser(req, res, req.body.username)
            const balanceAtual = userName.dataValues.account.dataValues.balance

            //Checando se o account é diferente de quem ta logado
            if(myBalance.dataValues.id === userName.dataValues.id){
                res.status(400).json('Voce não pode transferir para voce mesmo')
                return
            } 

            //Atualiza o balance de quem recebeu
            const account = req.body as IAccount
            account.balance = balanceAtual + req.body.value           
            const newAccount = await repositoryAccount.set(userName.dataValues.accountId, account)

            //Atualiza o balance de quem pagou
            const accountAtual = req.body as IAccount
            accountAtual.balance = myBalance.dataValues.balance - req.body.value
            const newAccountAtual = await repositoryAccount.set(req.body.myAccount, accountAtual)

            //Transactions debited      
            const newTransactionsDebited = req.body as ITransaction
            newTransactionsDebited.debitedAccountId = myBalance.dataValues.id
            await repository.add(newTransactionsDebited)

            //Transactions credited
            const newTransactionsCredited = req.body as ITransaction
            newTransactionsCredited.creditedAccountId = userName.dataValues.accountId
            newTransactionsCredited.debitedAccountId = null 
            await repository.add(newTransactionsCredited)
          
            
            res.status(200).json(newAccountAtual)
        } else {
            res.status(400).json('Seu saldo é insuficiente')
        }    


    } catch (error) {
        res.status(400).json(error)
    }
}

async function getByAccount(req:Request, res:Response){
    try {
        const account = req.body.debitedAccountId
        
        if(!account) throw new Error('Id is invalid formtat!')

        const result = await repository.findByAccount(account)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}
export default {addTransaction, getByAccount}