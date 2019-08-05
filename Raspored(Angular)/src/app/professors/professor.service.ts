import {Professor} from './professor.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
    constructor(private http: HttpClient) {}

    getProfessors() {
        return this.http.get<Professor[]>(environment.apiURL + '/profesor/getAll');
    }

    getProfessor(id: number) {
        return this.http.get<Professor>(environment.apiURL + '/profesor/get', {params: {id: id+""}});
    }

    addProfessor(professor: Professor) {
        return this.http.post<Professor>(environment.apiURL + '/profesor/new', professor);
    }

    updateProfessor(newProfessors: Professor) {
        return this.http.put<boolean>(environment.apiURL + '/profesor/update', newProfessors);
    }

    deleteProfessor(id: number) {
        return this.http.delete<boolean>(environment.apiURL + '/profesor/delete', {params: {id: id+""}});
    }
}