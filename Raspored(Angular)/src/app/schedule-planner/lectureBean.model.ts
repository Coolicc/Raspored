import { Schedule } from '../schedules/schedule.model';
import { Classroom } from '../classrooms/classroom.model';
import { LecturerBean } from './lecturerBean.model';

export class LectureBean {
    constructor(public predavanjeID: number, public dan: string, public do_: Date, public od: Date, public tip: string,
        public rasporedBean: Schedule, public ucionicaBean: Classroom, public predavacBean: LecturerBean) {
        }
}