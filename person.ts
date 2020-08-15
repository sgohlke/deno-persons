 export class Person{
    id: number;
    lastName: string = 'UNKNOWN'; 
    firstName: string = 'UNKNOWN';
    age: number = 999

    constructor(id: number, lastName: string, firstName: string, age: number) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = age;
    }
}