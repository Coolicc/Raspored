import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from './course.service';
import { Subscription } from 'rxjs';
import { Course } from './course.model';
import { Professor } from '../professors/professor.model';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Lecturer } from './lecturer.model';
import { ProfessorService } from '../professors/professor.service';

@Component({
	selector: 'app-courses',
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
	courses: Course[];
	professors: Professor[];
	errorMessage: string;
	coursesForm: FormGroup;
	selectedCourse: Course;

	constructor(private courseService: CourseService, private professorService: ProfessorService) { }

	ngOnInit() {
		this.coursesForm = new FormGroup({
			'name': new FormControl(null),
			'year': new FormControl(null),
			'mandatory': new FormControl(null),
			'numberOfLecturers': new FormControl('2'),
			'lecturers': new FormArray([new FormGroup({
				'professor': new FormControl,
				'type': new FormControl
			}), new FormGroup({
				'professor': new FormControl,
				'type': new FormControl
			})])
		});

		this.courseService.getCourses().subscribe((data: Course[]) => {
			this.courses = data;
			this.closeErrorMessage();
		}, (error) => {
			this.errorMessage = error.error;
		});

		this.professorService.getProfessors().subscribe((data: Professor[]) => {
			this.professors = data;
			this.closeErrorMessage();
		}, (error) => {
			this.errorMessage = error.error;
		});
	}

	add() {
		let lecturers: Lecturer[] = [];
		for (let i = 0; i < this.coursesForm.value.lecturers.length; i++) {
			let professor: Professor = this.professors.find(x => x.profesorID == this.coursesForm.value.lecturers[i].professor);
			lecturers.push(new Lecturer(null, this.coursesForm.value.lecturers[i].type, professor));
		}
		let course: Course = new Course(null,
			this.coursesForm.value.name,
			this.coursesForm.value.year,
			this.coursesForm.value.mandatory,
			lecturers
		);
		this.courseService.addCourse(course).subscribe((newCourse: Course) => {
			let notInserter: boolean = true;
			for (let i = 0; i < this.courses.length; i++) {
				if (newCourse.naziv < this.courses[i].naziv) {
					this.courses.splice(i, 0, newCourse);
					notInserter = false;
					break;
				}
			}
			if (notInserter) {
				this.courses.push(newCourse);
			}
			let nOfLecturers = this.coursesForm.value.numberOfLecturers;
			this.coursesForm.reset();
			this.coursesForm.patchValue({numberOfLecturers: nOfLecturers});
			this.closeErrorMessage();
		}, (error) => {
			this.errorMessage = error.error;
		});	
	}

	update() {
		if (this.selectedCourse !== null) {
			let lecturers: Lecturer[] = [];
			for (let i = 0; i < this.coursesForm.value.lecturers.length; i++) {
				let professor: Professor = this.professors.find(x => x.profesorID == this.coursesForm.value.lecturers[i].professor);
				if (i < this.selectedCourse.predavaci.length) {
					lecturers.push(new Lecturer(this.selectedCourse.predavaci[i].predavacID, this.coursesForm.value.lecturers[i].type, professor));
				} else {
					lecturers.push(new Lecturer(null, this.coursesForm.value.lecturers[i].type, professor));
				}
			}
			let course: Course = new Course(
				this.selectedCourse.predmetID,
				this.coursesForm.value.name,
				this.coursesForm.value.year,
				this.coursesForm.value.mandatory,
				lecturers
			);
			this.courseService.updateCourse(course).subscribe((res: boolean) => {
				if (res === true) {
					let courseToUpdate: Course = this.courses.find(x => x.predmetID == this.selectedCourse.predmetID);
					courseToUpdate.naziv = course.naziv;
					courseToUpdate.godina = course.godina;
					courseToUpdate.obavezan = course.obavezan;
					courseToUpdate.predavaci = lecturers;
					this.courses.sort((a, b) => {
						if (a.naziv > b.naziv) return 1;
						else if (b.naziv > a.naziv) return -1;
						else return 0;
					});
					this.selectedCourse = null;
					let nOfLecturers = this.coursesForm.value.numberOfLecturers;
					this.coursesForm.reset();
					this.coursesForm.patchValue({numberOfLecturers: nOfLecturers});
					this.closeErrorMessage();
				}
			}, (error) => {
				this.errorMessage = error.error;
			});
		}
	}

	delete() {
		this.courseService.deleteCourse(this.selectedCourse.predmetID).subscribe((res: boolean) => {
			if (res === true) {
				for( var i = 0; i < this.courses.length; i++){ 
				    if ( this.courses[i].predmetID === this.selectedCourse.predmetID) {
					  this.courses.splice(i, 1);
				      break;
				    }
				}
			}
			this.selectedCourse = null;
			let nOfLecturers = this.coursesForm.value.numberOfLecturers;
			this.coursesForm.reset();
			this.coursesForm.patchValue({numberOfLecturers: nOfLecturers});
			this.closeErrorMessage(); 
		}, (error) => {
			this.errorMessage = error.error;
		});
	}

	onRowSelect(course: Course) {
		this.selectedCourse = course;
		this.coursesForm.patchValue({
			name: this.selectedCourse.naziv,
			year: this.selectedCourse.godina,
			mandatory: this.selectedCourse.obavezan,
			numberOfLecturers: this.selectedCourse.predavaci.length
		});
		let lecturers = (<FormArray>this.coursesForm.get('lecturers'));
		lecturers.clear();
		for (let i = 0; i < this.selectedCourse.predavaci.length; i++) {
			lecturers.push(new FormGroup({
				'professor': new FormControl(this.selectedCourse.predavaci[i].profesor.profesorID),
				'type': new FormControl(this.selectedCourse.predavaci[i].tip)
			}));
		}
	}

	professorsToString(lecturers: Lecturer[]): string {
		if (lecturers.length == 0)
			return '';
		let s: string = lecturers[0].profesor.ime + " " + lecturers[0].profesor.prezime;
		for (let i = 1; i < lecturers.length; i++) {
			s = s + ", " + lecturers[i].profesor.ime + " " + lecturers[i].profesor.prezime;
		}
		return s;
	}

	onNumberLecturersChange(newValue) {
		let lecturers = (<FormArray>this.coursesForm.get('lecturers'));
		while (lecturers.length < newValue) {
			lecturers.push(new FormGroup({
				'professor': new FormControl(null),
				'type': new FormControl(null)
			}));
		}
		while (lecturers.length > newValue) {
			lecturers.removeAt(newValue);
		}
	}

	closeErrorMessage() {
		this.errorMessage = null;
	}

}
