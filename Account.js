class Account{
    static accountId=0
    static passbook=[]
    constructor(bankId,balance){
        this.accountId=Account.accountId++
        this.bankId=bankId
        this.balance=balance
    }
    static newAccount(bankId,balance){
        try {
            if (typeof bankId!='number'){
                throw new Error('Invalid bank id')
            }
            if (typeof balance!='number'){
                throw new Error ('Invalid bank balance format')
            }
            return new Account(bankId,balance)
        } catch (error) {
           console.log(error.message) 
        }
    }
    getBalance(){
        return this.balance
    }
    depositAmount(amount){
        try {
            if (typeof amount!='number'){
                throw new Error ('Invalid amount format')
            }
            return this.balance+=amount
        } catch (error) {
           console.log(error.message) 
        }
    }
    withdrawAmount(amount){
        try {
            if (typeof amount!='number'){
                throw new Error ('Invalid amount format')
            }
            return this.balance-=amount
        } catch (error) {
           console.log(error.message) 
        }
    }
    static printPassbook(transactionDetails){
        try {
            Account.passbook.push(transactionDetails)
        } catch (error) {
            console.log(error.message)
        }
    }
    static getPassbook(){
        return this.passbook
    }
}
module.exports=Account