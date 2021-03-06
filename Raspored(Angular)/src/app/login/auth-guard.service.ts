import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root',
  })
export class AuthGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.loginService.isUserLoggedIn()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }

}