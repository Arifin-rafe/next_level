// getter setter

class BankAccount {
    public readonly userId : string;
    public userName : string;
    private userBalance : number;
    constructor(userId: string, userName: string, userBalance: number) {
        this.userId = userId;
        this.userName = userName;
        this.userBalance = userBalance;
    }
    // addBalance(amount: number) {
    //     this.userBalance += amount;
    // }

    // using getter
    set addBalance(amount: number) {
        this.userBalance += amount;
    }
    //using setter
    get getBalance() {
     return this.userBalance;
    }

}

const account = new BankAccount("12345", "Alice", 1000);
account.addBalance = 500;
console.log(account.getBalance);
