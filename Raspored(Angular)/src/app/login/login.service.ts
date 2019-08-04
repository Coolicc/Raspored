import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    constructor(private http: HttpClient) {}

    public login(username: string, password: string) {
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.http.get<Boolean>('http://localhost:8080/auth/login', {headers});
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