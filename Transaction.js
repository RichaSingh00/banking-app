class Transaction{
    static allTransaction=[]
    constructor(date,senderId,receiverId,type,amount,currentBalance){
        this.date=date
        this.senderId=senderId
        this.receiverId=receiverId
        this.type=type
        this.amount=amount
        this.currentBalance=currentBalance
    }
    static newTransaction(date,senderId,receiverId,type,amount,currentBalance){
        try {
            let newTransaction=new Transaction(date,senderId,receiverId,type,amount,currentBalance)
            Transaction.allTransaction.push(newTransaction)
            return newTransaction
        } catch (error) {
            console.log(error.message)
        }
    }
    static getAllTransaction(){
        return Transaction.allTransaction
    }
}
module.exports=Transaction