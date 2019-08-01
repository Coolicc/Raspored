import { Professor } from '../professors/professor.model';

export class Lecturer {
    constructor(public predavacID: number, public tip: string, public profesor: Professor) {}
}