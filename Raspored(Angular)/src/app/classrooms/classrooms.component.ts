import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassroomService } from './classroom.service';
import { Classroom } from './classroom.model';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-classrooms',
	templateUrl: './classrooms.component.html',
	styleUrls: ['./classrooms.component.css']
})
export class ClassroomsComponent implements OnInit {
	@ViewChild('f',{static:false}) classroomForm: NgForm;
	selectedClassroom: Classroom;
	classrooms: Classroom[];
	errorMessage: string;

	constructor(private classroomService: ClassroomService) { }

	ngOnInit() {
		this.selectedClassroom = null;
		this.errorMessage = null;
		// this.classrooms = this.classroomService.getClassrooms();
		// this.subscription = this.classroomService.classroomsChanged.subscribe((classrooms: Classroom[]) => {
		// 	this.classrooms = classrooms;
		// });
		this.classroomService.getClassrooms().subscribe((data: Classroom[]) => {
			console.log(data);
			this.classrooms = data;
			this.closeErrorMessage();
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});
	}

	add() {
		console.log("ADD");
		console.log(this.classroomForm);
		let classroom: Classroom = new Classroom(null, this.classroomForm.value.name);
		this.classroomService.addClassroom(classroom).subscribe((newClassroom: Classroom) => {
			this.classrooms.push(newClassroom);
			this.classroomForm.reset();
			this.closeErrorMessage();
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});	
	}

	update() {
		console.log("UPDATE");
		console.log(this.classroomForm);
		if (this.selectedClassroom !== null) {
			let classroom: Classroom = new Classroom(this.selectedClassroom.ucionicaID, this.classroomForm.value.name);
			this.classroomService.updateClassroom(classroom).subscribe((res: boolean) => {
				if (res === true) {
					let classroomToUpdate: Classroom = this.classrooms.find(x => x.ucionicaID == this.selectedClassroom.ucionicaID);
					classroomToUpdate.naziv = classroom.naziv;
					this.selectedClassroom = null;
					this.classroomForm.reset();
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
		console.log(this.classroomForm);
		this.classroomService.deleteClassroom(this.selectedClassroom.ucionicaID).subscribe((res: boolean) => {
			if (res === true) {
				for( var i = 0; i < this.classrooms.length; i++){ 
				    if ( this.classrooms[i].ucionicaID === this.selectedClassroom.ucionicaID) {
					  this.classrooms.splice(i, 1);
				      break;
				    }
				}
			}
			this.selectedClassroom = null;
			this.classroomForm.reset();
			this.closeErrorMessage(); 
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});
	}

	onRowSelect(classroom: Classroom) {
		this.selectedClassroom = classroom;
		this.classroomForm.form.patchValue({name: this.selectedClassroom.naziv});
		console.log(this.selectedClassroom);
	}

	closeErrorMessage() {
		this.errorMessage = null;
	}

}
