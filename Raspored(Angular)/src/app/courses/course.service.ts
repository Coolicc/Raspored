import {Course} from './course.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
  })
export class CourseService {

    constructor(private http: HttpClient) {}

    getCourses() {
        return this.http.get<Course[]>(environment.apiURL + '/predmet/getAllWithPredavacs');
    }

    getCourse(id: number) {
        return this.http.get<Course>(environment.apiURL + '/predmet/getWithPredavacs', {params: {id: id+""}});
    }

    addCourse(course: Course) {
        return this.http.post<Course>(environment.apiURL + '/predmet/newWithPredavacs', course);
    }

    updateCourse(newCourse) {
        return this.http.put<boolean>(environment.apiURL + '/predmet/updateWithPredavacs', newCourse);
    }

    deleteCourse(id: number) {
        return this.http.delete<boolean>(environment.apiURL + '/predmet/delete', {params: {id: id+""}});
    }
}