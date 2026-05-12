const filterEvenNumbers = (numbers: number[]): number[] => {
    return numbers.filter(num => num % 2 === 0);
}
const evenNumbers = filterEvenNumbers([1, 2, 3, 4, 5, 6]);
console.log(evenNumbers);

///////////
function reverseString(word: string): string {
    return word.split('').reverse().join('');
}

const reversedStringLoop = reverseString('typescript');
console.log(reversedStringLoop);

////////////////
type StringOrNumber = string | number;

function checkType(value: StringOrNumber): string {
    if (typeof value === "string") {
        return "String";
    } else {
        return "Number";
    }
}

console.log(checkType("Hello")); 
console.log(checkType(42));      
///////////
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

const user = {
    id: 1,
    name: "John Doe",
    age: 21
};

console.log(getProperty(user, "name"));
/////////
interface Book {
    title: string;
    author: string;
    publishedYear: number;
}

function toggleReadStatus(book: Book) {
    return {
        ...book,
        isRead: true
    };
}

const myBook = {
    title: "TypeScript Guide",
    author: "Jane Doe",
    publishedYear: 2024
};

console.log(toggleReadStatus(myBook));

////////

class Person{
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Student extends Person {
    grade: number;
    constructor(name: string, age: number, grade: number) {
        super(name, age);
        this.grade = grade;
    }
}