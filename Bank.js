class Bank {
  static bankId = 0;
  static allBanks = [];
  constructor(bankName, abbrevation) {
    this.bankId = Bank.bankId++;
    this.bankName = bankName;
    this.abbrevation = abbrevation;
  }
  static createBank(bankName) {
    if (typeof bankName != "string") {
      throw new Error("Invalid name format");
    }
    let abbrevation = bankName
      .split(" ")
      .map((x) => x.charAt(0))
      .join("");
    let newBank = new Bank(bankName, abbrevation);
    Bank.allBanks.push(newBank);
    return newBank;
  }
  catch(error) {
    console.log(error.message);
  }
  static getAllBanks() {
    return Bank.allBanks;
  }
  static findBank(bankId) {
    for (let index = 0; index < this.allBanks.length; index++) {
      if (bankId == Bank.allBanks[index].bankId) {
        return [Bank.allBanks[index], index];
      }
    }
    return [null, -1];
  }
  #updateBankNameAndAbbrevation(value) {
    if (typeof value != "string") {
      throw new Error("Invalid value format ");
    }
    this.bankName = value;
    this.abbrevation = value
      .split(" ")
      .map((x) => x.charAt(0))
      .join("");
  }
  static updateBank(parameter, value) {
    if (typeof parameter != "string") {
      throw new Error("Invalid parameter format");
    }
    switch (parameter) {
      case "bankName":
        this.#updateBankNameAndAbbrevation(value);
        break;
      default:
        throw new Error("Invalid parameter");
        break;
    }
  }
  catch(error) {
    console.log(error.message);
  }
  static removeBank(indexOfBankToBeRemoved) {
    return Bank.allBanks.splice(indexOfBankToBeRemoved, 1);
  }
}
module.exports = Bank;
