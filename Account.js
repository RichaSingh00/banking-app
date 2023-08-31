class Account{
    static accountId=0
    constructor(bankId,balance){
        this.accountId=Account.accountId++
        this.bankId=bankId
        this.balance=balance
        this.passbook=[]

    }
    static newAccount(bankId,balance){
        try {
            if (typeof bankId!='number'){
                throw new Error('Invalid bank id')
            }
            if (typeof balance!='number'){
                throw new Error ('Invalid bank balance format')
            }
            if (balance<1000){
                throw new Error ('Balance should be greater than 1000')
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
            if (typeof amount>=this.balance){
                throw new Error ('Withdrawal amount is more than the balance amount')
            }
            return this.balance-=amount
        } catch (error) {
           console.log(error.message) 
        }
    }
    getAccountSummary(){
        return {
            accountId:this.accountId,
            bankId:this.bankId,
            balance:this.balance,
        };
    }
    getPassbook(){
        return this.passbook
    }
}
module.exports=Account