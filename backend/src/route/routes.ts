import accountsControllers from '../controllers/accounts'
import usersControllers from '../controllers/users'
import transactionsControllers from '../controllers/transactions'
import { Router } from "express";


const router = Router()

// ACCOUNTS
router.post('/accounts', accountsControllers.addAccount)
//router.get('/accounts/:id', accountsControllers.getAccountId)
//router.patch('/accounts/:id', accountsControllers.setAccount)

// USERS
router.post('/users', usersControllers.addUser);
router.post('/users/login', usersControllers.loginUser)
router.get('/users/:accountId', usersControllers.getByAccountId)
router.get('/users', usersControllers.getUserByName)

// TRANSACTIONS
router.post('/transactions', transactionsControllers.addTransaction)
router.get('/transactions', transactionsControllers.getByAccount)

export default router