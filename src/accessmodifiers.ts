class BankAccount {
    public readonly userId : string;
    public userName : string;
    private userBalance : number;
    constructor(userId: string, userName: string, userBalance: number) {
        this.userId = userId;
        this.userName = userName;
        this.userBalance = userBalance;
    }
    addBalance(amount: number) {
        this.userBalance += amount;
    }

}

const account1 = new BankAccount("12345", "Alice", 1000);
console.log(account1)