import accountsControllers from '../controllers/accounts'
import usersControllers from '../controllers/users'
import transactionsControllers from '../controllers/transactions'
import validate from './auth.middlewares'
import { Router } from "express";


const router = Router()

// ACCOUNTS
router.post('/accounts', accountsControllers.addAccount)
router.get('/accounts/:id', validate.validateAuth, accountsControllers.getAccount)


// USERS
router.post('/users', usersControllers.addUser);
router.post('/users/login', usersControllers.loginUser)
router.get('/users/:accountId', usersControllers.getByAccountId)
router.get('/users', usersControllers.getUserByName)

// TRANSACTIONS
router.post('/transactions', validate.validateAuth, transactionsControllers.addTransaction)
router.get('/transactions/:id', validate.validateAuth, transactionsControllers.getByAccount)

export default router