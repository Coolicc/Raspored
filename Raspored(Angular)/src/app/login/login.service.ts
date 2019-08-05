import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    constructor(private http: HttpClient) {}

    public login(username: string, password: string) {
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.http.get<Boolean>(environment.apiURL + '/auth/login', {headers});
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('username')
        return !(user === null)
      }
    
      logOut() {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('userToken');
      }

}