import { Professor } from '../professors/professor.model';
import { CourseBean } from './courseBean.model';

export class LecturerBean {
    constructor(public predavacID: number, public tip: string, public profesorBean: Professor, public predmetBean: CourseBean) {}
}