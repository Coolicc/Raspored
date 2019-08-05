import {Classroom} from './classroom.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
    constructor(private http: HttpClient) {}

    getClassrooms() {
        return this.http.get<Classroom[]>(environment.apiURL + '/ucionica/getAll');
    }

    getClassroom(id: number) {
        return this.http.get<Classroom>(environment.apiURL + '/ucionica/get', {params: {id: id+""}});
    }

    addClassroom(classroom: Classroom) {
        return this.http.post<Classroom>(environment.apiURL + '/ucionica/new', classroom);
    }

    updateClassroom(newClassroom: Classroom) {
        return this.http.put<boolean>(environment.apiURL + '/ucionica/update', newClassroom);
    }

    deleteClassroom(id: number) {
        return this.http.delete<boolean>(environment.apiURL + '/ucionica/delete', {params: {id: id+""}});
    }
}