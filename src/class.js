"use strict";
class Animal {
    name;
    species;
    sound;
    constructor(name, species, sound) {
        this.name = name;
        this.species = species;
        this.sound = sound;
    }
}
const dog = new Animal("Buddy", "Dog", "Woof");
console.log(dog.name);
console.log(dog.species);
console.log(dog.sound);
