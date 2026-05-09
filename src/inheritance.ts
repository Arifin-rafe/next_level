class Person {
    name: string;
    age: number;
    address: string;
    constructor( name: string, age: number, address: string) {
        this.name = name;
        this.age = age;
        this.address = address;
    
    }
}

class Employee extends Person {
    employeeId: number;
    department: string;
    constructor(name: string, age: number, address: string,employeeId: number, department: string) {
        super(name, age, address);
        this.employeeId = employeeId;
        this.department = department;
    }
}

const employee1 = new Employee("Alice", 30, "123 Main St", 101, "HR");
console.log(employee1.name); 
console.log(employee1.age); 
console.log(employee1.address); 
console.log(employee1.employeeId); 
console.log(employee1.department);