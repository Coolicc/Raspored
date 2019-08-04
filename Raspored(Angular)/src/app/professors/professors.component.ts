import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfessorService } from './professor.service';
import { Professor } from './professor.model';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-professors',
	templateUrl: './professors.component.html',
	styleUrls: ['./professors.component.css']
})
export class ProfessorsComponent implements OnInit {
	@ViewChild('f',{static:false}) professorForm: NgForm;
	selectedProfessor: Professor;
	professors: Professor[];
	errorMessage: string;

	constructor(private professorService: ProfessorService) { }

	ngOnInit() {
		this.selectedProfessor = null;
		this.errorMessage = null;
		// this.professors = this.professorService.getProfessors();
		// this.subscription = this.professorService.professorsChanged.subscribe((professors: Professor[]) => {
		// 	this.professors = professors;
		// });
		this.professorService.getProfessors().subscribe((data: Professor[]) => {
			console.log(data);
			this.professors = data;
			this.closeErrorMessage();
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});
	}

	add() {
		console.log("ADD");
		console.log(this.professorForm);
		let professor: Professor = new Professor(null, this.professorForm.value.name, this.professorForm.value.surname);
		this.professorService.addProfessor(professor).subscribe((newProfessor: Professor) => {
			for (let i = 0; i < this.professors.length; i++) {
				if (newProfessor.prezime < this.professors[i].prezime || 
					newProfessor.prezime == this.professors[i].prezime && newProfessor.ime < this.professors[i].ime) {
					this.professors.splice(i, 0, newProfessor);
					break;
				}
			}
			this.professorForm.reset();
			this.closeErrorMessage();
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});	
	}

	update() {
		console.log("UPDATE");
		console.log(this.professorForm);
		if (this.selectedProfessor !== null) {
			let professor: Professor = new Professor(this.selectedProfessor.profesorID, this.professorForm.value.name, this.professorForm.value.surname);
			this.professorService.updateProfessor(professor).subscribe((res: boolean) => {
				if (res === true) {
					let professorToUpdate: Professor = this.professors.find(x => x.profesorID == this.selectedProfessor.profesorID);
					professorToUpdate.ime = professor.ime;
					professorToUpdate.prezime = professor.prezime;
					this.professors.sort((a, b) => {
						if (a.prezime < b.prezime || a.prezime == b.prezime && a.ime < b.ime) return -1;
						else if (a.prezime > b.prezime || a.prezime == b.prezime && a.ime > b.ime) return 1;
						else return 0;
					});
					this.selectedProfessor = null;
					this.professorForm.reset();
					this.closeErrorMessage();
				}
			}, (error) => {
				console.log(error);
				this.errorMessage = error.error;
			});
		}
	}

	delete() {
		console.log("DELETE");
		console.log(this.professorForm);
		this.professorService.deleteProfessor(this.selectedProfessor.profesorID).subscribe((res: boolean) => {
			if (res === true) {
				for( var i = 0; i < this.professors.length; i++){ 
				    if ( this.professors[i].profesorID === this.selectedProfessor.profesorID) {
				      this.professors.splice(i, 1); 
				      break;
				    }
				}
			}
			this.selectedProfessor = null;
			this.professorForm.reset();
			this.closeErrorMessage();
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});
	}

	onRowSelect(professor: Professor) {
		this.selectedProfessor = professor;
		this.professorForm.form.patchValue({name: this.selectedProfessor.ime, surname: this.selectedProfessor.prezime});
		console.log(professor);
	}

	closeErrorMessage() {
		this.errorMessage = null;
	}

}
