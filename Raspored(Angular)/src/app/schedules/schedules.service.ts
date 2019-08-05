import {Schedule} from './schedule.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
    constructor(private http: HttpClient) {}

    getSchedules() {
        return this.http.get<Schedule[]>(environment.apiURL + '/raspored/getAll');
    }

    getSchedule(id: number) {
        return this.http.get<Schedule>(environment.apiURL + '/raspored/get', {params: {id: id+""}});
    }

    addSchedule(schedule: Schedule) {
        return this.http.post<Schedule>(environment.apiURL + '/raspored/new', schedule);
    }

    updateSchedule(newSchedule: Schedule) {
        return this.http.put<boolean>(environment.apiURL + '/raspored/update', newSchedule);
    }

    deleteSchedule(id: number) {
        return this.http.delete<boolean>(environment.apiURL + '/raspored/delete', {params: {id: id+""}});
    }

    getPDF(id: number): Observable<Blob> {
        return this.http.get(environment.apiURL + '/export/get', { responseType: 'blob', params: {id: id+""} });
    }

    getAllPDF(): Observable<Blob> {
        return this.http.get(environment.apiURL + '/export/getAll', { responseType: 'blob' });
    }

}