import Sequelize, { Model, Optional} from 'sequelize';
import database from '../db';
import { ITransaction } from './transactions';
import { accountModel } from './accounts-model'

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
    },
    createdAt: {
        type: Sequelize.DATE
    }
})

transactionModel.belongsTo(accountModel, {
    foreignKey: 'creditedAccountId'
})

transactionModel.belongsTo(accountModel, {
    foreignKey: 'debitedAccountId'
})


function findByDate(data:Date){
    return transactionModel.findAll<ITransactionModel>({ where: { createdAt: data}})
}

function findId(id:number){
    return transactionModel.findByPk<ITransactionModel>(id)
}

function add(account:ITransaction){
    return transactionModel.create(account)
}

function del(id:number){
    return transactionModel.destroy<ITransactionModel>({ where: {id}})
}

export default { findId, add, del, findByDate}
