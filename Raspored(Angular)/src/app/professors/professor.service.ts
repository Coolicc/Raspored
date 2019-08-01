import {Professor} from './professor.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
    constructor(private http: HttpClient) {}

    getProfessors() {
        return this.http.get<Professor[]>('http://localhost:8080/profesor/getAll');
        // return this.professors.slice();
    }

    getProfessor(id: number) {
        return this.http.get<Professor>('http://localhost:8080/profesor/get', {params: {id: id+""}});
        // return this.professors[index];
    }

    addProfessor(professor: Professor) {
        return this.http.post<Professor>('http://localhost:8080/profesor/new', professor);
        // this.professors.push(professor);
        // this.professorsChanged.next(this.professors.slice());
    }

    updateProfessor(newProfessors: Professor) {
        return this.http.put<boolean>('http://localhost:8080/profesor/update', newProfessors);
        // this.professors[index] = newProfessors;
        // this.professorsChanged.next(this.professors.slice());
    }

    deleteProfessor(id: number) {
        return this.http.delete<boolean>('http://localhost:8080/profesor/delete', {params: {id: id+""}});
        // this.professors.splice(index, 1);
        // this.professorsChanged.next(this.professors.slice());
    }
}