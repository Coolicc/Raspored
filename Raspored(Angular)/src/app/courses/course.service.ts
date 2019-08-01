import {Course} from './course.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
export class CourseService {

    constructor(private http: HttpClient) {}

    getCourses() {
        return this.http.get<Course[]>('http://localhost:8080/predmet/getAllWithPredavacs');
    }

    getCourse(id: number) {
        return this.http.get<Course>('http://localhost:8080/predmet/getWithPredavacs', {params: {id: id+""}});
    }

    addCourse(course: Course) {
        return this.http.post<Course>('http://localhost:8080/predmet/newWithPredavacs', course);
    }

    updateCourse(newCourse) {
        return this.http.put<boolean>('http://localhost:8080/predmet/updateWithPredavacs', newCourse);
    }

    deleteCourse(id: number) {
        return this.http.delete<boolean>('http://localhost:8080/predmet/delete', {params: {id: id+""}});
    }
}