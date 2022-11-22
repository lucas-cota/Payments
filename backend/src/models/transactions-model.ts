import Sequelize, { Model, Optional} from 'sequelize';
import database from '../db';
import { ITransaction } from './transactions';
import { accountModel } from './accounts-model'
import { IAccount } from './accounts';

interface ITransactionCreationAttributes extends Optional<ITransaction, "id">{}

export interface ITransactionModel extends Model<ITransaction, ITransactionCreationAttributes>, ITransaction {}

export const transactionModel = database.define<ITransactionModel>('transaction', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    value: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
   
})

transactionModel.belongsTo(accountModel, {
    foreignKey: 'creditedAccountId',
    constraints: false
})

transactionModel.belongsTo(accountModel, {
    foreignKey: 'debitedAccountId',
    constraints: false
})



function findId(id:number){
    return transactionModel.findByPk<ITransactionModel>(id)
}

function add(account:ITransaction){
    return transactionModel.create(account)
}

function findByAccount(account:number){
    return transactionModel.findAll<ITransactionModel>({ where: { debitedAccountId: account}})
}

function del(id:number){
    return transactionModel.destroy<ITransactionModel>({ where: {id}})
}

export default { findId, add, del, findByAccount}
