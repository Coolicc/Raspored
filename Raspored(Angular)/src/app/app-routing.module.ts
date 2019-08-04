import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfessorsComponent } from './professors/professors.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { SchedulePlannerComponent } from './schedule-planner/schedule-planner.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './login/auth-guard.service';

const appRoutes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'ucionice', component: ClassroomsComponent, canActivate: [AuthGuard]},
    {path: 'predmeti', component: CoursesComponent, canActivate: [AuthGuard]},
    {path: 'profesori', component: ProfessorsComponent, canActivate: [AuthGuard]},
    {path: 'rasporedi', component: SchedulesComponent, canActivate: [AuthGuard]},
    {path: 'raspored', component: SchedulePlannerComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}