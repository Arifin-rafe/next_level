class Person0 {
    work() {
        console.log("Person works");
    }
}

class Student extends Person0 {
    work() {
        console.log("Student studies");
    }
}

class Teacher extends Person0 {
    work() {
        console.log("Teacher teaches");
    }
}

const persons: Person0[] = [
    new Student(),
    new Teacher()
];

persons.forEach(person => person.work());

class Shape {
    area(): number {
        return 0;
    }
}

class Circle extends Shape {
    radius: number;
    constructor( radius: number) {
        super();
        this.radius = radius;
    }
    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}
class Rectangle extends Shape {
    width: number;
    height: number;
    constructor( width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }
    area(): number {
        return this.width * this.height;
    }
}

const newCircle = new Circle(5);
const newRectangle = new Rectangle(4, 6);
console.log(`Area of Circle: ${newCircle.area()}`);
console.log(`Area of Rectangle: ${newRectangle.area()}`);