import { Component, OnInit, ViewChild } from '@angular/core';
import { Lecture } from './lecture.model';
import { SchedulePlannerService } from './schedule-planner.service';
import { CourseService } from '../courses/course.service';
import { Course } from '../courses/course.model';
import { Professor } from '../professors/professor.model';
import { Lecturer } from '../courses/lecturer.model';
import { Classroom } from '../classrooms/classroom.model';
import { ClassroomService } from '../classrooms/classroom.service';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter';
import { NgForm } from '@angular/forms';
import { CourseBean } from './courseBean.model';
import { LecturerBean } from './lecturerBean.model';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../schedules/schedules.service';
import { Schedule } from '../schedules/schedule.model';
import { LectureBean } from './lectureBean.model';

@Component({
	selector: 'app-schedule-planner',
	templateUrl: './schedule-planner.component.html',
	styleUrls: ['./schedule-planner.component.css'],
	providers: [
		{
		  provide: CalendarDateFormatter,
		  useClass: CustomDateFormatter
		}
	]
})
export class SchedulePlannerComponent implements OnInit {
	@ViewChild('f',{static:false}) lectureForm: NgForm;
	selectedLecture: Lecture;
	lectures: Lecture[]; 
	errorMessage: string;
	courses: Course[];
	courseLecturers: Lecturer[];
	classrooms: Classroom[];
	viewDate: Date = new Date(1970, 5, 1, 0, 0, 0, 0);
	events: CalendarEvent[] = [];
	schedule: Schedule;

	constructor(private schedulePlannerService: SchedulePlannerService, private courseService: CourseService,
		 private classroomService: ClassroomService, private route: ActivatedRoute, private scheduleService: ScheduleService) { }

	ngOnInit() {
		this.selectedLecture = null;
		this.errorMessage = null;
		let scheduleID =  this.route.snapshot.queryParams['schedule'];
		this.schedulePlannerService.getLectures(scheduleID).subscribe((data: Lecture[]) => {
			console.log(data);
			this.lectures = data;
			let eventsToAdd: CalendarEvent[] = [];
			this.lectures.forEach(lecture => {
				eventsToAdd.push({
					id: lecture.predavanjeID,
					start: new Date(Date.parse(lecture.od)),
					  end: new Date(Date.parse(lecture.do_)),
					  title: this.getEventTitle(lecture),
					  color: {
						primary: '#1e90ff',
						secondary: '#D1E8FF'
					},
					  resizable: {
						beforeStart: true,
						afterEnd: true
					  },
					  draggable: true
				});
			});
			this.events = [...this.events, ...eventsToAdd];
			console.log(this.events);
			this.closeErrorMessage();
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});
		
		this.courseService.getCourses().subscribe((data: Course[]) => {
			console.log(data);
			this.courses = data;
			this.closeErrorMessage();
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});

		this.classroomService.getClassrooms().subscribe((data: Classroom[]) => {
			console.log(data);
			this.classrooms = data;
			this.closeErrorMessage();
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});

		this.scheduleService.getSchedule(scheduleID).subscribe((data: Schedule) => {
			console.log(data);
			this.schedule = data;
			this.closeErrorMessage;
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});

		console.log(this.viewDate);
	}

	getEventTitle(lecture: Lecture): string {
		let from: Date = new Date(Date.parse(lecture.od));
		let to: Date = new Date(Date.parse(lecture.do_));
		return from.getHours() + ':' + (from.getMinutes() < 10 ? '0' + from.getMinutes() : from.getMinutes()) + '-' 
		+ to.getHours() + ':' + (to.getMinutes() < 10 ? '0' + to.getMinutes() : to.getMinutes()) + ' ' 
		+ lecture.predavacBean.predmetBean.naziv + ', ' + lecture.predavacBean.profesorBean.ime.charAt(0) + '. ' 
		+ lecture.predavacBean.profesorBean.prezime + ', ' + lecture.tip + ', ' + lecture.ucionicaBean.naziv;
	}

	add() {
		// this.events = [
		// 	...this.events,
		// 	{
		// 		start: new Date(1970, 5, 1, 15, 0, 0, 0),
		// 		title: 'asdasasdasd',
		// 		end: new Date(1970, 5, 1, 16, 0, 0, 0)
		// 	}
		//   ];
		console.log('ADD');
		console.log(this.lectureForm);
		let course: Course = this.courses.find(x => x.predmetID == this.lectureForm.value.course);
		let courseBean: CourseBean = new CourseBean(course.predmetID, course.naziv, course.godina, course.obavezan ? 1 : 0);
		let lecturer: Lecturer = this.courseLecturers.find(x => x.predavacID == this.lectureForm.value.lecturer);
		let lecturerBean: LecturerBean = new LecturerBean(lecturer.predavacID, lecturer.tip, lecturer.profesor, courseBean);
		let classroom: Classroom = this.classrooms.find(x => x.ucionicaID == this.lectureForm.value.classroom);
		let day: string = this.lectureForm.value.day;
		let dayDate: String;
		switch(day) {
			case 'Ponedeljak': {
				dayDate = '01';
				break;
			}
			case 'Utorak': {
				dayDate = '02';
				break;
			}
			case 'Sreda': {
				dayDate = '03';
				break;
			}
			case 'Četvrtak': {
				dayDate = '04';
				break;
			}
			case 'Petak': {
				dayDate = '05';
				break;
			}
			case 'Subota': {
				dayDate = '06';
				break;
			}
			case 'Nedelja': {
				dayDate = '07';
				break;
			}
		}
		let from: Date = new Date(Date.parse('1970-06-' + dayDate + 'T' + this.lectureForm.value.from));
		let to: Date = new Date(Date.parse('1970-06-' + dayDate + 'T' + this.lectureForm.value.to));
		let lecture: LectureBean = new LectureBean(null, this.lectureForm.value.day, to, from, this.lectureForm.value.type, 
			this.schedule, classroom, lecturerBean);
		this.schedulePlannerService.addLecture(lecture).subscribe((newLecture: Lecture) => {
			this.lectures.push(newLecture);
			this.events = [
				...this.events,
				{
					id: newLecture.predavanjeID,
					start: new Date(Date.parse(newLecture.od)),
					  end: new Date(Date.parse(newLecture.do_)),
					  title: this.getEventTitle(newLecture),
					  color: {
						primary: '#1e90ff',
						secondary: '#D1E8FF'
					},
					  resizable: {
						beforeStart: true,
						afterEnd: true
					  },
					  draggable: true
				}
			];
			this.lectureForm.reset();
			this.closeErrorMessage();
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});	
	}

	update() {
		console.log("UPDATE");
		console.log(this.lectureForm);
		if (this.selectedLecture !== null) {
			let course: Course = this.courses.find(x => x.predmetID == this.lectureForm.value.course);
			let courseBean: CourseBean = new CourseBean(course.predmetID, course.naziv, course.godina, course.obavezan ? 1 : 0);
			let lecturer: Lecturer = this.courseLecturers.find(x => x.predavacID == this.lectureForm.value.lecturer);
			let lecturerBean: LecturerBean = new LecturerBean(lecturer.predavacID, lecturer.tip, lecturer.profesor, courseBean);
			let classroom: Classroom = this.classrooms.find(x => x.ucionicaID == this.lectureForm.value.classroom);
			let day: string = this.lectureForm.value.day;
			let dayDate: String;
			switch(day) {
				case 'Ponedeljak': {
					dayDate = '01';
					break;
				}
				case 'Utorak': {
					dayDate = '02';
					break;
				}
				case 'Sreda': {
					dayDate = '03';
					break;
				}
				case 'Četvrtak': {
					dayDate = '04';
					break;
				}
				case 'Petak': {
					dayDate = '05';
					break;
				}
				case 'Subota': {
					dayDate = '06';
					break;
				}
				case 'Nedelja': {
					dayDate = '07';
					break;
				}
			}
			let fromString: string = '1970-06-' + dayDate + 'T' + this.lectureForm.value.from;
			let toString: string = '1970-06-' + dayDate + 'T' + this.lectureForm.value.to;
			let from: Date = new Date(Date.parse(fromString));
			let to: Date = new Date(Date.parse(toString));
			let lecture: LectureBean = new LectureBean(this.selectedLecture.predavanjeID, this.lectureForm.value.day, to, from,
				 this.lectureForm.value.type, this.schedule, classroom, lecturerBean);
			this.schedulePlannerService.updateLecture(lecture).subscribe((res: boolean) => {
				if (res == true) {
					this.selectedLecture.dan = lecture.dan;
					this.selectedLecture.do_ = toString;
					this.selectedLecture.od = fromString;
					this.selectedLecture.tip = lecture.tip;
					this.selectedLecture.predavacBean = lecture.predavacBean;
					this.selectedLecture.rasporedBean = lecture.rasporedBean;
					this.selectedLecture.ucionicaBean = lecture.ucionicaBean;
					let event = {
						id: this.selectedLecture.predavanjeID,
						start: new Date(Date.parse(this.selectedLecture.od)),
						  end: new Date(Date.parse(this.selectedLecture.do_)),
						  title: this.getEventTitle(this.selectedLecture),
						  color: {
							primary: '#1e90ff',
							secondary: '#D1E8FF'
						},
						  resizable: {
							beforeStart: true,
							afterEnd: true
						  },
						  draggable: true
					}
					// let eventIndex = this.events.indexOf(event);
					// this.events.splice(eventIndex, 1, event);
					// this.events = this.events;
					this.events = [...this.events.filter(x => x.id != event.id), event];
					this.selectedLecture = null;
					this.lectureForm.reset();
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
		console.log(this.lectureForm);
		this.schedulePlannerService.deleteLecture(this.selectedLecture.predavanjeID).subscribe((res: boolean) => {
			if (res === true) {
				let index = this.lectures.indexOf(this.selectedLecture);
				this.lectures.splice(index, 1);
				this.events = [...this.events.filter(x => x.id != this.selectedLecture.predavanjeID)];
			}
			this.selectedLecture = null;
			this.lectureForm.reset();
			this.closeErrorMessage(); 
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});
	}

	eventTimesChanged({
		event,
		newStart,
		newEnd
	}: CalendarEventTimesChangedEvent): void {
		console.log('EVENT TIME CHANGE');
		console.log(event);
		console.log(newStart);
		console.log(newEnd);
		let dayDate: string;
		let day: string;
		switch(newStart.getDate()) {
			case 1: {
				dayDate = '01';
				day = 'Ponedeljak';
				break;
			}
			case 2: {
				dayDate = '02';
				day = 'Utorak';
				break;
			}
			case 3: {
				dayDate = '03';
				day = 'Sreda';
				break;
			}
			case 4: {
				dayDate = '04';
				day = 'Četvrtak';
				break;
			}
			case 5: {
				dayDate = '05';
				day = 'Petak';
				break;
			}
			case 6: {
				dayDate = '06';
				day = 'Subota';
				break;
			}
			case 7: {
				dayDate = '07';
				day = 'Nedelja';
				break;
			}
		}
		let fromHours: string = newStart.getHours() < 10 ? '0' + newStart.getHours(): '' + newStart.getHours();
		let fromMinutes: string = newStart.getMinutes() < 10 ? '0' + newStart.getMinutes(): '' + newStart.getMinutes();
		let fromString: string = '1970-06-' + dayDate + 'T' + fromHours + ':' + fromMinutes;
		let toHours: string = newEnd.getHours() < 10 ? '0' + newEnd.getHours(): '' + newEnd.getHours();
		let toMinutes: string = newEnd.getMinutes() < 10 ? '0' + newEnd.getMinutes(): '' + newEnd.getMinutes();
		let toString: string = '1970-06-' + dayDate + 'T' + toHours + ':' + toMinutes;
		let lectureToUpdate: Lecture = this.lectures.find(x => x.predavanjeID == event.id);
		let lectureBean: LectureBean = new LectureBean(lectureToUpdate.predavanjeID, day,
			 newEnd, newStart, lectureToUpdate.tip, lectureToUpdate.rasporedBean, lectureToUpdate.ucionicaBean,
			 lectureToUpdate.predavacBean);
		this.schedulePlannerService.updateLecture(lectureBean).subscribe((res: boolean) => {
			if (res == true) {
				lectureToUpdate.dan = day;
				lectureToUpdate.do_ = toString;
				lectureToUpdate.od = fromString;
				event.start = newStart;
				event.end = newEnd;
				event.title = this.getEventTitle(lectureToUpdate);
				this.events = [...this.events.filter(x => x.id != event.id), event];
				this.closeErrorMessage();
				}
			}, (error) => {
				console.log(error);
				this.errorMessage = error.error;
		});
	}
	
	handleEvent(action: string, event: CalendarEvent): void {
		console.log('EVENT CLICKED');
		console.log(event);
		this.selectedLecture = this.lectures.find(x => x.predavanjeID == event.id);
		this.onCourseSelect(this.selectedLecture.predavacBean.predmetBean.predmetID);
		let from: Date = new Date(Date.parse(this.selectedLecture.od));
		let fromHours: string = from.getHours() < 10 ? '0' + from.getHours(): '' + from.getHours();
		let fromMinutes: string = from.getMinutes() < 10 ? '0' + from.getMinutes(): '' + from.getMinutes();
		let to: Date = new Date(Date.parse(this.selectedLecture.do_));
		let toHours: string = to.getHours() < 10 ? '0' + to.getHours(): '' + to.getHours();
		let toMinutes: string = to.getMinutes() < 10 ? '0' + to.getMinutes(): '' + to.getMinutes();
		this.lectureForm.form.patchValue({
			course: this.selectedLecture.predavacBean.predmetBean.predmetID,
			lecturer: this.selectedLecture.predavacBean.predavacID,
			classroom: this.selectedLecture.ucionicaBean.ucionicaID,
			type: this.selectedLecture.tip,
			day: this.selectedLecture.dan,
			from: fromHours + ':' + fromMinutes,
			to: toHours + ':' + toMinutes
		});
	}

	onCourseSelect(courseID: number) {
		this.courseLecturers = this.courses.find(x => x.predmetID == courseID).predavaci;
	}

	closeErrorMessage() {
		this.errorMessage = null;
	}

}
