import Sequelize, { Model, Optional} from 'sequelize';
import accounts from '../controllers/accounts';
import database from '../db';
import { accountModel } from './accounts-model';
import { IUser } from './users';

interface IUserCreationAttributes extends Optional<IUser, "id">{}

export interface IUserModel extends Model<IUser, IUserCreationAttributes>, IUser {}

export const userModel = database.define<IUserModel>('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false    
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Esse campo não pode ser vazio'
            },
            len: {
                args: [3, 50],
                msg: 'Esse campo deve ter no mínimo 3 caracteres'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }    
})

userModel.belongsTo(accountModel)

function findId(id:number){
    return userModel.findByPk<IUserModel>(id)
}

function findAccountId(account:number){
    return userModel.findOne<IUserModel>({
        where: {accountId: account},
        include: [
            { model: accountModel }
        ]
    })
}

function findUser(name:string){
    return userModel.findOne<IUserModel>({
        where: { username: name},
        include: [
            {model: accountModel}
        ]
    })
}

function add(user:IUser){
    return userModel.create(user)
}

function del(id:number){
    return userModel.destroy<IUserModel>({ where: {id}})
}

export default { findId, add, del, findUser, findAccountId}