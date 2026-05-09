class Animal {
    constructor(public name: string, public species: string, public sound: string) {
    }
    makeSound() {
        console.log(`${this.name} says ${this.sound}`);
    }
}
const dog = new Animal("Buddy", "Dog", "Woof");
const cat = new Animal("Ziggy", "Cat", "Meow");
const dogSound = dog.makeSound();
const catSound = cat.makeSound();


