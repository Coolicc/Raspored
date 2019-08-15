import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Schedule } from './schedule.model';
import { NgForm } from '@angular/forms';
import { ScheduleService } from './schedules.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ScheduleModalComponent} from './schedule-modal/schedule-modal.component';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
    selectedSchedule: Schedule;
    errorMessage: string;
    schedules: Schedule[];

    constructor(private scheduleService: ScheduleService, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.errorMessage = null;
        this.selectedSchedule = null;
        this.scheduleService.getSchedules().subscribe((data: Schedule[]) => {
                this.schedules = data;
                this.closeErrorMessage();
            }, (error) => {
                this.errorMessage = error.error;
            });
    }

    update(form: NgForm) {
        if (this.selectedSchedule !== null) {
            let schedule: Schedule = new Schedule(this.selectedSchedule.rasporedID, form.value.name, form.value.course, form.value.year, form.value.priority);
            this.scheduleService.updateSchedule(schedule).subscribe((res: boolean) => {
                if (res === true) {
                    this.selectedSchedule.naziv = schedule.naziv;
                    this.selectedSchedule.godina = schedule.godina;
                    this.selectedSchedule.smer = schedule.smer;
                    this.selectedSchedule = null;
                    this.closeErrorMessage();
                }
            }, (error) => {
                this.errorMessage = error.error;
            });
        }
    }

    delete(schedule: Schedule) {
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

    onRowSelect(schedule: Schedule, form: NgForm) {
        this.selectedSchedule = schedule;
        form.form.patchValue({name: schedule.naziv, course: schedule.smer, year: schedule.godina, priority: schedule.prioritet});
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
                    scheduleUp.prioritet = schedule.prioritet;
                    schedule.prioritet = schedule.prioritet + 1;
                })
                this.closeErrorMessage();
            }
        }, (error) => {
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
                    scheduleUp.prioritet = schedule.prioritet;
                    schedule.prioritet = schedule.prioritet - 1;
                })
                this.closeErrorMessage();
            }
        }, (error) => {
            scheduleUp.prioritet = schedule.prioritet;
            schedule.prioritet = schedule.prioritet - 1;
        });
    }

    closeErrorMessage() {
        this.errorMessage = null;
    }

    openSchedule(schedule: Schedule) {
        this.router.navigate(['/raspored'], { queryParams: { schedule: schedule.rasporedID } });
    }

    openAddModal() {
        const modalRef = this.modalService.open(ScheduleModalComponent);
        modalRef.result.then((result) => {
            if (result) {
                let schedule: Schedule = new Schedule(null, result.value.name, result.value.course, result.value.year, this.schedules.length);
		        this.scheduleService.addSchedule(schedule).subscribe((newSchedule: Schedule) => {
			        this.schedules.push(newSchedule);
                    this.closeErrorMessage();
		        }, (error) => {
			        this.errorMessage = error.error;
		        });
            }
        }).catch((error) => {
            console.log(error);
        });
    }

}
