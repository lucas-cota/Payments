export type ITransaction = {
    id?: number
    debitedAccountId?: number
    creditedAccountId?: number
    createdAt?: string,
    value: number
}