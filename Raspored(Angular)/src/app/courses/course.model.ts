import { Lecturer } from './lecturer.model';

export class Course {
    constructor(public predmetID: number, public naziv: string, public godina: number, public obavezan: boolean, public predavaci: Lecturer[]) {}
}