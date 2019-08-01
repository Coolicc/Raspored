import {Classroom} from './classroom.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
    constructor(private http: HttpClient) {}

    getClassrooms() {
        return this.http.get<Classroom[]>('http://localhost:8080/ucionica/getAll');
        // return this.classrooms.slice();
    }

    getClassroom(id: number) {
        // return this.classrooms[index];
        return this.http.get<Classroom>('http://localhost:8080/ucionica/get', {params: {id: id+""}});
    }

    addClassroom(classroom: Classroom) {
        // this.classrooms.push(classroom);
        // this.classroomsChanged.next(this.classrooms.slice());
        return this.http.post<Classroom>('http://localhost:8080/ucionica/new', classroom);
    }

    updateClassroom(newClassroom: Classroom) {
        return this.http.put<boolean>('http://localhost:8080/ucionica/update', newClassroom);
        // let classroom: Classroom = this.classrooms.find(x => x.ucionicaID == index);
        // classroom.naziv = newClassroom.name;
        // this.classroomsChanged.next(this.classrooms.slice());
    }

    deleteClassroom(id: number) {
        // for( var i = 0; i < this.classrooms.length; i++){ 
        //     if ( this.classrooms[i].ucionicaID === id) {
        //       this.classrooms.splice(i, 1); 
        //       break;
        //     }
        //  }
        // this.classroomsChanged.next(this.classrooms.slice());
        return this.http.delete<boolean>('http://localhost:8080/ucionica/delete', {params: {id: id+""}});
    }
}