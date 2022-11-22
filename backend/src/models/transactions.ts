export type ITransaction = {
    id?: number
    debitedAccountId?: number
    creditedAccountId?: number
    createdAt?: Date,
    accountId?: number,
    value: number
}