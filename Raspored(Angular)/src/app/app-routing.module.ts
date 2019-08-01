import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfessorsComponent } from './professors/professors.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { SchedulePlannerComponent } from './schedule-planner/schedule-planner.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/ucionice', pathMatch: 'full'},
    {path: 'ucionice', component: ClassroomsComponent},
    {path: 'predmeti', component: CoursesComponent},
    {path: 'profesori', component: ProfessorsComponent},
    {path: 'rasporedi', component: SchedulesComponent},
    {path: 'raspored', component: SchedulePlannerComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}