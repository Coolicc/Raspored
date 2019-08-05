import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  	errorMessage: string;

  	constructor(private loginService: LoginService, private router: Router) { }

  	ngOnInit() {
		  if (this.loginService.isUserLoggedIn()) {
			  this.router.navigate(['/rasporedi']);
		  }
    	this.errorMessage = null;
  	}

  	login(form: NgForm) {
		this.loginService.login(form.value.username, form.value.password).subscribe((res: Boolean) => {
			if (res) {
				sessionStorage.setItem('username', form.value.username);
				sessionStorage.setItem('userToken', 'Basic ' + btoa(form.value.username + ':' + form.value.password));
				this.router.navigate(['/rasporedi']);
			}
		}, (error) => {
			if (error.status == 401) {
				this.errorMessage = 'Nepoznato korsničko ime ili lozinka';
			} else {
				this.errorMessage = 'Problem sa serverom. Pokušajte kasnije.';
			}
		});
  	}

	closeErrorMessage() {
		this.errorMessage = null;
	}

}
