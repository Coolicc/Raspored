import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lecture } from './lecture.model';
import { LectureBean } from './lectureBean.model';

@Injectable({
  providedIn: 'root',
})
export class SchedulePlannerService {
    constructor(private http: HttpClient) {}

    getLectures(id: number) {
        return this.http.get<Lecture[]>('http://localhost:8080/predavanje/getAllFor', {params: {id: id+""}});
    }

    getLecture(id: number) {
        return this.http.get<Lecture>('http://localhost:8080/predavanje/get', {params: {id: id+""}});
    }

    addLecture(lecture: LectureBean) {
        return this.http.post<Lecture>('http://localhost:8080/predavanje/new', lecture);
    }

    updateLecture(newLecture: LectureBean) {
        return this.http.put<boolean>('http://localhost:8080/predavanje/update', newLecture);
    }

    deleteLecture(id: number) {
        return this.http.delete<boolean>('http://localhost:8080/predavanje/delete', {params: {id: id+""}});
    }
}