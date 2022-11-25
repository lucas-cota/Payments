import Sequelize, { Model, Optional} from 'sequelize';
import database from '../db';
import { IAccount } from './accounts';

interface IAccountCreationAttributes extends Optional<IAccount, "id">{}

export interface IAccountModel extends Model<IAccount, IAccountCreationAttributes>, IAccount {}

export const accountModel = database.define<IAccountModel>('account', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    balance: {
        type: Sequelize.DECIMAL
    }    
})

function findId(id:number){
    return accountModel.findByPk<IAccountModel>(id)
}

function add(account:IAccount){
    return accountModel.create(account)
}


async function set(id:number, account:IAccount, ){
    const originalAccount = await accountModel.findByPk<IAccountModel>(id)
    if(originalAccount !== null){
        let newAccount:IAccount = {
            'balance': account.balance
        }
        
        await originalAccount.update(newAccount)
        return originalAccount;
    }
    throw new Error('Account not found.');
}

export default { findId, add,  set}