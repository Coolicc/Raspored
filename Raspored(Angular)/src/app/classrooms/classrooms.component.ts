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
		this.classroomService.getClassrooms().subscribe((data: Classroom[]) => {
			this.classrooms = data;
			this.closeErrorMessage();
		}, (error) => {
			this.errorMessage = error.error;
		});
	}

	add() {
		let classroom: Classroom = new Classroom(null, this.classroomForm.value.name);
		this.classroomService.addClassroom(classroom).subscribe((newClassroom: Classroom) => {
			let notInserter: boolean = true;
			for (let i = 0; i < this.classrooms.length; i++) {
				if (newClassroom.naziv < this.classrooms[i].naziv) {
					this.classrooms.splice(i, 0, newClassroom);
					notInserter = false;
					break;
				}
			}
			if (notInserter) {
				this.classrooms.push(newClassroom);
			}
			this.classroomForm.reset();
			this.closeErrorMessage();
		}, (error) => {
			this.errorMessage = error.error;
		});	
	}

	update() {
		if (this.selectedClassroom !== null) {
			let classroom: Classroom = new Classroom(this.selectedClassroom.ucionicaID, this.classroomForm.value.name);
			this.classroomService.updateClassroom(classroom).subscribe((res: boolean) => {
				if (res === true) {
					let classroomToUpdate: Classroom = this.classrooms.find(x => x.ucionicaID == this.selectedClassroom.ucionicaID);
					classroomToUpdate.naziv = classroom.naziv;
					this.classrooms.sort((a, b) => {
						if (a.naziv > b.naziv) return 1;
						else if (b.naziv > a.naziv) return -1;
						else return 0;
					});
					this.selectedClassroom = null;
					this.classroomForm.reset();
					this.closeErrorMessage();
				}
			}, (error) => {
				this.errorMessage = error.error;
			});
		}
	}

	delete() {
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
			this.errorMessage = error.error;
		});
	}

	onRowSelect(classroom: Classroom) {
		this.selectedClassroom = classroom;
		this.classroomForm.form.patchValue({name: this.selectedClassroom.naziv});
	}

	closeErrorMessage() {
		this.errorMessage = null;
	}

}
