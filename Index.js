const Customer=require("./Customer")

let admin=Customer.newAdmin("Admin","1")
// console.log(admin)

let customer1=admin.newCustomer("Sanika","Shinde",2000)
let customer2=admin.newCustomer("Deep","Singh",3000)
// console.log(admin.getAllCustomer())

// admin.updateCustomer(1,'first',"Deepanshu")
// console.log(admin.getAllCustomer())

// admin.removeCustomer(1)
// console.log(admin.getAllCustomer())

let bank1=admin.createBank("Bank Of India")
let bank2=admin.createBank("Indian Overseas Bank")
// console.log(admin.getAllBanks())

// admin.updateBank(0,"bankName","Canara Bank")
// console.log(bank1)

// admin.removeBank(0)
// console.log('Banks after removal: ',admin.getAllBanks())

customer1.createAccount(0,2000)
customer1.createAccount(1,4000)
// console.log(customer1.getAllAccounts())

customer2.createAccount(0,1000)
customer2.createAccount(1,3000)
// console.log(customer2.getAllAccounts())

// customer1.removeAccount(1)
// console.log(customer1.getAllAccounts())

customer1.deposit(1,3000)
// console.log(customer1.getAllAccounts())

customer1.withdraw(1,500)
// // console.log(customer1.getAllAccounts())
// console.log(customer1.getTransaction())

customer1.transfer(1,2,3,1000)
console.log(customer1.getTransaction())

console.log(customer1.getPassbook(1))
console.log(customer2.getPassbook(3))
