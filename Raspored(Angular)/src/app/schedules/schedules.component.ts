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
		let schedule: Schedule = new Schedule(null, this.scheduleForm.value.name, this.scheduleForm.value.course, this.scheduleForm.value.year, this.schedules.length);
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
            let schedule: Schedule = new Schedule(this.selectedSchedule.rasporedID, this.scheduleForm.value.name, this.scheduleForm.value.course, this.scheduleForm.value.year, this.scheduleForm.value.priority);
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

    export(schedule: Schedule) {
        this.scheduleService.getPDF(schedule.rasporedID).subscribe(x => {
            // It is necessary to create a new blob object with mime-type explicitly set
           // otherwise only Chrome works like it should
           var newBlob = new Blob([x], { type: "application/pdf" });

           // IE doesn't allow using a blob object directly as link href
           // instead it is necessary to use msSaveOrOpenBlob
           if (window.navigator && window.navigator.msSaveOrOpenBlob) {
               window.navigator.msSaveOrOpenBlob(newBlob);
               return;
           }

           // For other browsers: 
           // Create a link pointing to the ObjectURL containing the blob.
           const data = window.URL.createObjectURL(newBlob);

           var link = document.createElement('a');
           link.href = data;
           link.download = "Raspored.pdf";
           // this is necessary as link.click() does not work on the latest firefox
           link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

           setTimeout(function () {
               // For Firefox it is necessary to delay revoking the ObjectURL
               window.URL.revokeObjectURL(data);
               link.remove();
           }, 100);
       });
    }

    exportAll() {
        this.scheduleService.getAllPDF().subscribe(x => {
             // It is necessary to create a new blob object with mime-type explicitly set
            // otherwise only Chrome works like it should
            var newBlob = new Blob([x], { type: "application/pdf" });

            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }

            // For other browsers: 
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(newBlob);

            var link = document.createElement('a');
            link.href = data;
            link.download = "Raspored.pdf";
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
    }

    onRowSelect(schedule: Schedule) {
        this.selectedSchedule = schedule;
        this.scheduleForm.form.patchValue({name: schedule.naziv, course: schedule.smer, year: schedule.godina, priority: schedule.prioritet});
        console.log(this.selectedSchedule);
    }

    up(schedule: Schedule) {
        let index = this.schedules.indexOf(schedule);
        if (index == 0) 
            return;
        let scheduleUp: Schedule = this.schedules[index-1];
        scheduleUp.prioritet = schedule.prioritet;
        schedule.prioritet = schedule.prioritet - 1;
        this.scheduleService.updateSchedule(schedule).subscribe((res: boolean) => {
            if (res === true) {
                this.scheduleService.updateSchedule(scheduleUp).subscribe((res: boolean) => {
                    if (res === true) {
                        this.schedules[index-1] = schedule;
                        this.schedules[index] = scheduleUp;
                        this.closeErrorMessage();
                    }
                }, (error) => {
                    console.log(error);
                    scheduleUp.prioritet = schedule.prioritet;
                    schedule.prioritet = schedule.prioritet + 1;
                })
                this.closeErrorMessage();
            }
        }, (error) => {
            console.log(error);
            scheduleUp.prioritet = schedule.prioritet;
            schedule.prioritet = schedule.prioritet + 1;
        });
    }

    down(schedule: Schedule) {
        let index = this.schedules.indexOf(schedule);
        if (index == this.schedules.length-1) 
            return;
        let scheduleUp: Schedule = this.schedules[index+1];
        scheduleUp.prioritet = schedule.prioritet;
        schedule.prioritet = schedule.prioritet + 1;
        this.scheduleService.updateSchedule(schedule).subscribe((res: boolean) => {
            if (res === true) {
                this.scheduleService.updateSchedule(scheduleUp).subscribe((res: boolean) => {
                    if (res === true) {
                        this.schedules[index+1] = schedule;
                        this.schedules[index] = scheduleUp;
                        this.closeErrorMessage();
                    }
                }, (error) => {
                    console.log(error);
                    scheduleUp.prioritet = schedule.prioritet;
                    schedule.prioritet = schedule.prioritet - 1;
                })
                this.closeErrorMessage();
            }
        }, (error) => {
            console.log(error);
            scheduleUp.prioritet = schedule.prioritet;
            schedule.prioritet = schedule.prioritet - 1;
        });
    }

    closeErrorMessage() {
        console.log("CLOSE ERROR MESSAGE");
        this.errorMessage = null;
    }

    openSchedule(schedule: Schedule) {
        this.router.navigate(['/raspored'], { queryParams: { schedule: schedule.rasporedID } });
    }

}
