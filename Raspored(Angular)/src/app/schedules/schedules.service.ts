import {Schedule} from './schedule.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
    constructor(private http: HttpClient) {}

    getSchedules() {
        return this.http.get<Schedule[]>('http://localhost:8080/raspored/getAll');
    }

    getSchedule(id: number) {
        return this.http.get<Schedule>('http://localhost:8080/raspored/get', {params: {id: id+""}});
    }

    addSchedule(schedule: Schedule) {
        return this.http.post<Schedule>('http://localhost:8080/raspored/new', schedule);
    }

    updateSchedule(newSchedule: Schedule) {
        return this.http.put<boolean>('http://localhost:8080/raspored/update', newSchedule);
    }

    deleteSchedule(id: number) {
        return this.http.delete<boolean>('http://localhost:8080/raspored/delete', {params: {id: id+""}});
    }

    getPDF(id: number): Observable<Blob> {
        return this.http.get('http://localhost:8080/export/get', { responseType: 'blob', params: {id: id+""} });
    }

    getAllPDF(): Observable<Blob> {
        return this.http.get('http://localhost:8080/export/getAll', { responseType: 'blob' });
    }

}