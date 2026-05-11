// instance of guard/type narrowing using instanceof

class Person{
    name: string;
    constructor(name: string) {
        this.name = name;
        
    }
    getSleepHours(numOfHours: number) {
        console.log(`${this.name} sleeps for ${numOfHours} hours.`);
    }
}

class Student extends Person {
    constructor(name: string) {
        super(name);
    }
    doStudy(numOfHours: number) {
        console.log(`${this.name} is studying for ${numOfHours} hours.`);
    }
}

class Teacher extends Person {
    constructor(name: string) {
        super(name);
    }
    teach(numOfHours: number) {
        console.log(`${this.name} is teaching ${numOfHours}.`);
    }
}

//function guard using instanceof

const isStudent = (user:Person)=>{
    return user instanceof Student;
}
const isTeacher = (user:Person)=>{
    return user instanceof Teacher;
}

    
const getUserInfo = (user: Person) => {
    if (isStudent(user)) {
        user.doStudy(8);
    } else if (isTeacher(user)) {
        user.teach(6);
    } else {
        user.getSleepHours(8);
    }
}

const student = new Student("Alice");
const teacher = new Teacher("Bob");
const person = new Person("Eve");

getUserInfo(student);
getUserInfo(teacher);
getUserInfo(person);