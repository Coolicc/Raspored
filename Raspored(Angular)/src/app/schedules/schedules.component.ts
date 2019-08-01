import { Component, OnInit, ViewChild } from '@angular/core';
import { Schedule } from './schedule.model';
import { NgForm } from '@angular/forms';
import { ScheduleService } from './schedules.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  @ViewChild('f',{static:false}) scheduleForm: NgForm;
  selectedSchedule: Schedule;
  errorMessage: string;
  schedules: Schedule[];

  constructor(private scheduleService: ScheduleService, private router: Router) {}

  ngOnInit() {
    this.errorMessage = null;
    this.selectedSchedule = null;
    this.scheduleService.getSchedules().subscribe((data: Schedule[]) => {
			console.log(data);
			this.schedules = data;
			this.closeErrorMessage();
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});
  }

  add() {
    console.log("ADD");
		console.log(this.scheduleForm);
		let schedule: Schedule = new Schedule(null, this.scheduleForm.value.name, this.scheduleForm.value.course, this.scheduleForm.value.year);
		this.scheduleService.addSchedule(schedule).subscribe((newSchedule: Schedule) => {
			this.schedules.push(newSchedule);
			this.scheduleForm.reset();
			this.closeErrorMessage();
		}, (error) => {
			console.log(error);
			this.errorMessage = error.error;
		});	
  }

  update() {
        console.log("UPDATE");
        console.log(this.scheduleForm);
        if (this.selectedSchedule !== null) {
            let schedule: Schedule = new Schedule(this.selectedSchedule.rasporedID, this.scheduleForm.value.name, this.scheduleForm.value.course, this.scheduleForm.value.year);
            this.scheduleService.updateSchedule(schedule).subscribe((res: boolean) => {
                if (res === true) {
                    this.selectedSchedule.naziv = schedule.naziv;
                    this.selectedSchedule.godina = schedule.godina;
                    this.selectedSchedule.smer = schedule.smer;
                    this.selectedSchedule = null;
                    this.closeErrorMessage();
                }
            }, (error) => {
                console.log(error);
                this.errorMessage = error.error;
            });
        }
    }

    delete(schedule: Schedule) {
        console.log("DELETE");
        console.log(schedule);
        this.scheduleService.deleteSchedule(schedule.rasporedID).subscribe((res: boolean) => {
            if (res === true) {
                for( var i = 0; i < this.schedules.length; i++){ 
                    if ( this.schedules[i].rasporedID === schedule.rasporedID) {
                    this.schedules.splice(i, 1);
                    break;
                    }
                }
            }
            this.selectedSchedule = null;
            this.closeErrorMessage(); 
        }, (error) => {
            console.log(error);
            this.errorMessage = error.error;
        });
    }

    onRowSelect(schedule: Schedule) {
        this.selectedSchedule = schedule;
        this.scheduleForm.form.patchValue({name: schedule.naziv, course: schedule.smer, year: schedule.godina});
        console.log(this.selectedSchedule);
    }

    closeErrorMessage() {
        console.log("CLOSE ERROR MESSAGE");
        this.errorMessage = null;
    }

    openSchedule(schedule: Schedule) {
        this.router.navigate(['/raspored'], { queryParams: { schedule: schedule.rasporedID } });
    }

}
