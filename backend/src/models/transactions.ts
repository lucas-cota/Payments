export type ITransaction = {
    id?: number
    debitedAccountId?: number
    type: string,
    accountId?: number,
    value: number
}