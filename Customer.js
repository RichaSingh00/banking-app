const Account = require("./Account");
const Bank = require("./Bank");
const Transaction = require("./Transaction");

class Customer {
  static customerId = 0;
  static allCustomers = [];
  constructor(firstName, lastName, isAdmin) {
    this.customerId = Customer.customerId++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isAdmin = isAdmin;
    this.allaccounts = [];
  }
  static newAdmin(firstName, lastName) {
    try {
      if (typeof firstName != "string") {
        throw new Error("Invalid first name format");
      }
      if (typeof lastName != "string") {
        throw new Error("Invalid last name format");
      }
      return new Customer(firstName, lastName, true);
    } catch (error) {
      console.log(error.message);
    }
  }
  newCustomer(firstName, lastName) {
    //Admin can create customer
    try {
      if (typeof firstName != "string") {
        throw new Error("Invalid first name format");
      }
      if (typeof lastName != "string") {
        throw new Error("Invalid last name format");
      }
      let newCustomer = new Customer(firstName, lastName, false);
      Customer.allCustomers.push(newCustomer);
      return newCustomer;
    } catch (error) {
      console.log(error.message);
    }
  }
  getAllCustomer() {
    try {
      if (!this.isAdmin) {
        throw new Error("Only admin can get customer info");
      }
      return Customer.allCustomers;
    } catch (error) {
      console.log(error.message);
    }
  }
  static #findCustomer(customerId) {
    //Admin can find customer using it's id
    for (let index = 0; index < Customer.allCustomers.length; index++) {
      if (customerId == Customer.allCustomers[index].customerId) {
        return [Customer.allCustomers[index], index];
      }
    }
    return [null, -1];
  }
  #updateFirstName(value) {
    if (typeof firstName !== "string") {
      throw new Error("Invalid first name format");
    }
    return (this.firstName = value);
  }
  #updateLastName(value) {
    if (typeof lastName !== "string") {
      throw new Error("Invalid last name format");
    }
    return (this.lastName = value);
  }
  updateCustomer(customerId, parameter, value) {
    //admin can update customer info
    try {
      if (!this.isAdmin) {
        throw new Error("Not an admin");
      }
      let [customerToBeUpdated, indexOfCustomerToBeUpdated] =
        Customer.#findCustomer(customerId);
      if (customerToBeUpdated == null) {
        throw new Error("No customer found");
      }
      switch (parameter) {
        case "firstName":
          customerToBeUpdated.#updateFirstName(value);
          break;
        case "lastName":
          customerToBeUpdated.#updateLastName(value);
          break;
        default:
          throw new Error("Invalid parameter");
          break;
      }
      return Customer.allCustomers;
    } catch (error) {
      console.log(error.message);
    }
  }
  removeCustomer(customerId) {
    //Admin can delete customer
    try {
      if (!this.isAdmin) {
        throw new Error("Not an admin");
      }
      let [customerToBeRemoved, indexOfCustomerToBeRemoved] =
        Customer.#findCustomer(customerId);
      if (customerToBeRemoved == null) {
        throw new Error("No customers found");
      }
      Customer.allCustomers.splice(indexOfCustomerToBeRemoved, 1);
      return `Customer is deleted at ${customerId}`;
    } catch (error) {
      console.log(error.message);
    }
  }
  createBank(bankName) {
    //Admin creates bank
    try {
      if (!this.isAdmin) {
        throw new Error("Not an admin");
      }
      let newBank = Bank.createBank(bankName);
      return newBank;
    } catch (error) {
      console.log(error.message);
    }
  }
  getAllBanks() {
    try {
      if (!this.isAdmin) {
        throw new Error("Not an admin");
      }
      let allBanks = Bank.getAllBanks();
      return allBanks;
    } catch (error) {
      console.log(error.message);
    }
  }
  updateBank(bankId, parameter, value) {
    //Admin updates bank
    try {
      if (!this.isAdmin) {
        throw new Error("Not an admin");
      }
      let [bankToBeUpdated, indexOfBankToBeUpdated] = Bank.findBank(bankId);
      if (bankToBeUpdated == null) {
        throw new Error("No bank found");
      }
      Bank.bankToBeUpdated.updateBank(bankId, parameter, value);
      return bankToBeUpdated;
    } catch (error) {
      console.log(error.message);
    }
  }
  removeBank(bankId) {
    //Admin can delete the bank
    try {
      if (!this.isAdmin) {
        throw new Error("Not an admin");
      }
      if (typeof bankId != "number") {
        throw new Error("Invalid bank id format");
      }
      let [bankToBeRemoved, indexOfBankToBeRemoved] = Bank.findBank(bankId);
      if (bankToBeRemoved == null) {
        throw new Error("No banks found");
      }
      bankToBeRemoved.removeBank(indexOfBankToBeRemoved);
      return `Bank is deleted at ${bankId}`;
    } catch (error) {
      console.log(error.message);
    }
  }
  createAccount(
    bankID,
    balance //Customer can create accounts
  ) {
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot create accounts");
      }
      let newAccount = Account.newAccount(bankID, balance);
      this.allaccounts.push(newAccount);
      return newAccount;
    } catch (error) {
      console.log(error.message);
    }
  }
  getAllAccounts() {
    //customer can get details of all it's accounts
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot get account info");
      }
      return this.allaccounts.map((account) => account.getAccountSummary());
    } catch (error) {
      console.log(error.message);
    }
  }
  #findAccount(accountId) {
    for (let index = 0; index < this.allaccounts.length; index++) {
      if (accountId == this.allaccounts[index].accountId) {
        return [this.allaccounts[index], index];
      }
    }
    return [null, -1];
  }
  removeAccount(accountId) {
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot remove account");
      }
      let [foundAccount, indexOFFoundAccount] = this.#findAccount(accountId);
      if (foundAccount == null) {
        throw new Error("Account number not found!");
      }
      this.allaccounts.splice(indexOFFoundAccount, 1);
      return `Account for ${accountId} is deleted`;
    } catch (error) {
      console.log(error.message);
    }
  }
  deposit(accountId, amount) {
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot perform deposit ");
      }
      let [account, indexOfAccount] = this.#findAccount(accountId);
      if (account == null) {
        throw new Error("Account not found!");
      }
      account.depositAmount(amount);
      let date = new Date();
      let transactionDetails = Transaction.newTransaction(
        date,
        null,
        this.customerId,
        "Credit",
        amount,
        account.getBalance()
      );
      account.getPassbook().push(transactionDetails);
      return account.getBalance();
    } catch (error) {
      console.log(error.message);
    }
  }
  withdraw(accountId, amount) {
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot access users account");
      }
      let [account, indexOfAccount] = this.#findAccount(accountId);
      if (account == null) {
        throw new Error("Account not found!");
      }
      account.withdrawAmount(amount);
      let date = new Date();
      let transactionDetails = Transaction.newTransaction(
        date,
        this.customerId,
        null,
        "Debit",
        amount,
        account.getBalance()
      );
      account.getPassbook().push(transactionDetails);
      return account.getBalance();
    } catch (error) {
      console.log(error.message);
    }
  }
  getTransaction() {
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot have access to transactions");
      }
      return Transaction.getAllTransaction();
    } catch (error) {
      console.log(error.message);
    }
  }
  transfer(senderAccountId, receiverCustomerId, receiverAccountId, amount) {
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot have access to account");
      }
      let [senderAccount, indexOfSenderAccount] =
        this.#findAccount(senderAccountId);
      if (senderAccount == null) {
        throw new Error("Sender account not found!");
      }
      let [receiverCustomer, indexOfReceiverCustomer] =
        Customer.#findCustomer(receiverCustomerId);
      if (receiverCustomer == null) {
        throw new Error("Receiver customer not found");
      }
      let [receiverAccount, indexOfReceiverAccount] =
        receiverCustomer.#findAccount(receiverAccountId);
      if (receiverAccount == null) {
        throw new Error("Receiver account not found!");
      }
      if (senderAccount.getBalance() < amount) {
        throw new Error("Insufficient funds");
      }
      senderAccount.withdrawAmount(amount);
      receiverAccount.depositAmount(amount);
      let date = new Date();
      let senderTransactionDetails = Transaction.newTransaction(
        date,
        this.customerId,
        this.receiverId,
        "Debit",
        amount,
        senderAccount.getBalance()
      );
      senderAccount.getPassbook().push(senderTransactionDetails);
      let receiverTransactionDetails = Transaction.newTransaction(
        date,
        this.customerId,
        receiverCustomerId,
        "Credit",
        amount,
        receiverAccount.getBalance()
      );
      receiverAccount.getPassbook().push(receiverTransactionDetails);
      return senderAccount.getBalance();
    } catch (error) {
      console.log(error.message);
    }
  }
  getPassbook(accountId) {
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot have access to account passbook");
      }
      let [account, indexOfAccount] = this.#findAccount(accountId);
      if (account == null) {
        throw new Error("Account not found");
      }
      return account.getPassbook();
    } catch (error) {
      console.log(error.message);
    }
  }
}
module.exports = Customer;
