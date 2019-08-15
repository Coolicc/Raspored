import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.css']
})
export class ScheduleModalComponent implements OnInit {
  @ViewChild('f',{static:false}) scheduleForm: NgForm;

  constructor( public activeModal: NgbActiveModal ) { }

  close() {
    this.activeModal.close();
  }

  onSubmit() {
    this.activeModal.close(this.scheduleForm);
  }

  ngOnInit() {
  }

}
