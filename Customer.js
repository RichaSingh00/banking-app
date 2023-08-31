const Account = require("./Account")
const Bank = require("./Bank")
const Transaction = require("./Transaction")

class Customer{
    static customerId=0
    static allCustomers=[]
    constructor(firstName, lastName,isAdmin) {
        this.customerId = Customer.customerId++
        this.firstName = firstName
        this.lastName = lastName
        this.isAdmin=isAdmin
        this.allaccounts = []
    }
    static newAdmin(firstName,lastName){
        try {
            if (typeof firstName!='string'){
                throw new Error('Invalid first name format')
            }
            if (typeof lastName!='string'){
                throw new Error('Invalid last name format')
            }
            return new Customer(firstName,lastName,true)
        } catch (error) {
            console.log(error.message)
        }
      }
      newCustomer(firstName,lastName,totalBalance){ //Admin can create customer
        try { 
            if(typeof firstName!='string'){
                throw new Error('Invalid first name format')
            }
            if (typeof lastName!='string'){
                throw new Error ('Invalid last name format')
            }
            let newCustomer=new Customer(firstName,lastName,false)
            Customer.allCustomers.push(newCustomer)
            return newCustomer
        } catch (error) {
            console.log(error.message)
        }
      }
      getAllCustomer(){
        try {
        if (!this.isAdmin){
            throw new Error('Only admin can get customer info')
        }
        return Customer.allCustomers
        } catch (error) {
            console.log(error.message)
        }
      }
     static #findCustomer(customerId){   //Admin can find customer using it's id
        for (let index = 0; index < Customer.allCustomers.length; index++) {
            if (customerId==Customer.allCustomers[index].customerId){
                return [Customer.allCustomers[index],index]
            }
        }
        return [null,-1]
      }
      #updateFirstName(value){
        if (typeof firstName!=='string'){
            throw new Error ('Invalid first name format')
        }
       return this.firstName=value
      }
      #updateLastName(value){
        if (typeof lastName!=='string'){
            throw new Error('Invalid last name format')
        }
       return this.lastName=value
      }
      
      updateCustomer(customerId,parameter,value){ //admin can update customer info
        try {
            if (!this.isAdmin){
                throw new Error('Not an admin')
            }
            let [customerToBeUpdated,indexOfCustomerToBeUpdated]=Customer.#findCustomer(customerId)
            if (customerToBeUpdated==null){
                throw new Error ('No customer found')
            }
            switch (parameter) {
                case 'first':customerToBeUpdated.#updateFirstName(value)
                    break;
                    case 'last':customerToBeUpdated.#updateLastName(value)
                    break;
                default: throw new Error ('Invalid parameter')
                    break;
            }
            return Customer.allCustomers
        } catch (error) {
            console.log(error.message)
        }
      }
      removeCustomer(customerId) { //Admin can delete customer
        try {
          if (!this.isAdmin) {
            throw new Error("Not an admin");
          }
          let [customerToBeRemoved, indexOfCustomerToBeRemoved] = Customer.#findCustomer(customerId)
          if (customerToBeRemoved == null) {
            throw new Error("No users found");
          }
          Customer.allCustomers.splice(indexOfCustomerToBeRemoved, 1);
          return `User is deleted at ${customerId}`;
        } catch (error) {
          console.log(error.message);
        }
      }
      createBank(bankName){  //Admin creates bank
        try {
            if (!this.isAdmin){
                throw new Error ('Not an admin')
            }
            if (typeof bankName!='string'){
                throw new Error('Invalid name format')
            }
            let newBank=Bank.createBank(bankName)
            return newBank
        } catch (error) {
            console.log(error.message)
        }
      }
      getAllBanks(){
        try {
            if (!this.isAdmin){
                throw new Error ("Not an admin")
            }
            let allBanks=Bank.getAllBanks()
            return allBanks
        } catch (error) {
            console.log(error.message)        
        }
      }
      updateBank(bankId,parameter,value){ //Admin updates bank
        try {
            if(!this.isAdmin){
                throw new Error ('Not an admin')
            }
            let [bankToBeUpdated,indexOfBankToBeUpdated]=Bank.findBank(bankId)
            if (bankToBeUpdated==null){
                throw new Error ('No bank found')
            }
            Bank.bankToBeUpdated.updateBank(bankId,parameter,value)
            return bankToBeUpdated
        } catch (error) {
            console.log(error.message)
        }
      }
      removeBank(bankId){   //Admin can delete the bank
        if (!this.isAdmin) {
            throw new Error("Not an admin");
          }
          let [bankToBeRemoved, indexOfBankToBeRemoved] = Bank.findBank(bankId)
          if (bankToBeRemoved == null) {
            throw new Error("No users found");
          }
          bankToBeRemoved.removeBank(indexOfBankToBeRemoved)
        //   Customer.allBanks.splice(indexOfBankToBeRemoved, 1);
          return `User is deleted at ${bankId}`;
        } catch (error) {
          console.log(error.message);
      }
      createAccount(bankID,balance) //Customer can create accounts
      {
          try {
              if (this.isAdmin) {
                  throw new Error("Admin cannot create account")
              }
              let newAccount = Account.newAccount(bankID,balance)
              this.allaccounts.push(newAccount)
              return newAccount
          } 
          catch (error) {
              console.log(error.message)
          }
      }
      getAllAccounts() //customer can get details of all it's accounts
      {
          try {
              if (this.isAdmin) {
                  throw new Error("Admin cannot accces accounts")
              }
              return this.allaccounts
          } catch (error) {
              console.log(error.message)
          }
      }
      #findAccount(accountId)
      {
          for (let index = 0; index < this.allaccounts.length; index++) {
              if(accountId == this.allaccounts[index].accountId)
              {
                  return [this.allaccounts[index],index]
              }        
          }
          return [null,-1]
      }
      removeAccount(accountId)
      {
          try {
              if(this.isAdmin)
              {
                  throw new Error("Admin cannot accces accounts")
              }
              let [foundAccount,indexOFFoundAccount]=this.#findAccount(accountId)
              if(foundAccount == null)
              {
                  throw new Error("Account number not found!")
              }
              this.allaccounts.splice(indexOFFoundAccount,1)
              console.log("Account Sucessfully Deleted")
          } catch (error) {
              console.log(error.message)
          }
      }
      deposit(accountId,amount)
      {
          try {
              if(this.isAdmin)
              {
                  throw new Error("Admin cannot accces users accounts")
              }
              let [foundAccountId,indexOFFoundAccount] = this.#findAccount(accountId)
              if(foundAccountId == null)
              {
                  throw new Error("Account number not found!")
              }
              let depositAmount=foundAccountId.depositAmount(amount)
              let date = new Date()
              let senderID=null
              let receiverID=this.customerId
              let type='Credit'
              let transactionAmount = amount
              let currentBalance = foundAccountId.getBalance()
              let transactionDetails= Transaction.newTransaction(date,senderID,receiverID,type,transactionAmount,currentBalance)
              Account.printPassbook(transactionDetails)
              return depositAmount
          } catch (error) {
              console.log(error.message)        
          }
      }
      withdraw(accountId,amount)
      {
          try {
              if(this.isAdmin)
              {
                  throw new Error("Admin cannot access users account")
              }
              let [foundAccountId,indexOFFoundAccount] = this.#findAccount(accountId)
              if(foundAccountId == null)
              {
                  throw new Error("Account number not found!")
              }
              let withdrawAmount=foundAccountId.withdrawAmount(amount)
              let date = new Date()
              let senderID=this.customerId
              let receiverID=null
              let type='Debit'
              let transactionAmount = amount
              let currentBalance = foundAccountId.getBalance()
              let transactionDetails = Transaction.newTransaction(date,senderID,receiverID,type,transactionAmount,currentBalance)
              Account.printPassbook(transactionDetails)
              return withdrawAmount
          } catch (error) {
              console.log(error.message)
          }
      }
      getPassbook()
      {
          try {
              if(this.isAdmin)
              {
                  throw new Error("Admin cannot have access to account")
              }
              return Account.getPassbook()
          } catch (error) {
              console.log(error.message)
          }
      }
      getTransaction()
      {
          try {
              if(this.isAdmin)
              {
                  throw new Error("Admin cannot have access to transactions")
              }
              return Transaction.getAllTransaction()
          } catch (error) {
              console.log(error.message)
          }
      }
      transfer(senderId,senderAccountId,receiverId,receiverAccountId,amount)
      {
          try {
              if(this.isAdmin)
              {
                  throw new Error("Admin cannot have access to account")
              } 
              let [foundSenderAccount,indexOFSenderAccount] = this.#findAccount(senderAccountId)
              if(foundSenderAccount == null)
              {
                  throw new Error("Account number not found!")
              }
              foundSenderAccount.withdrawAmount(amount)
              let date = new Date()
              let senderType='Debit'
              let transactionAmount = amount
              let senderCurrentBalance = foundSenderAccount.getBalance()
              let senderTransactionDetails = Transaction.newTransaction(date,senderId,null,senderType,transactionAmount,senderCurrentBalance)
              Account.printPassbook(senderTransactionDetails)
  
              let [receiver,receiverid] = Customer.#findCustomer(receiverId)
              
              let [foundReceiverAccount,indexOFReceiverAccount] = receiver.#findAccount(receiverAccountId)
              if(foundReceiverAccount == null)
              {
                  throw new Error("Account number not found!")
              }
              foundReceiverAccount.depositAmount(amount)
              let receiverType='Credit'
              let receiverCurrentBalance=foundReceiverAccount.getBalance()
              Transaction.newTransaction(date,senderId,receiverId,receiverType,transactionAmount,receiverCurrentBalance)
          } catch (error) {
              console.log(error.message)
          }
      } 
}
module.exports=Customer;
