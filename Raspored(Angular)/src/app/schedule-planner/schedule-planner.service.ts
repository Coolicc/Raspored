import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lecture } from './lecture.model';
import { LectureBean } from './lectureBean.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchedulePlannerService {
    constructor(private http: HttpClient) {}

    getLectures(id: number) {
        return this.http.get<Lecture[]>(environment.apiURL + '/predavanje/getAllFor', {params: {id: id+""}});
    }

    getLecture(id: number) {
        return this.http.get<Lecture>(environment.apiURL + '/predavanje/get', {params: {id: id+""}});
    }

    addLecture(lecture: LectureBean) {
        return this.http.post<Lecture>(environment.apiURL + '/predavanje/new', lecture);
    }

    updateLecture(newLecture: LectureBean) {
        return this.http.put<boolean>(environment.apiURL + '/predavanje/update', newLecture);
    }

    deleteLecture(id: number) {
        return this.http.delete<boolean>(environment.apiURL + '/predavanje/delete', {params: {id: id+""}});
    }
}