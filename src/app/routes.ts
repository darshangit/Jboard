import { Routes } from '@angular/router';
import { RetroComponent, LeavesTrainingComponent, LTCalendarComponent,
    MemberComponent, JarLocationDetailsComponent, SprintPlanningComponent,
    SprintDetailsComponent, LoginComponent, PairProgramComponent, ScrumComponent } from './index';


export const appRoutes: Routes = [
    { path: 'app-retro', component: RetroComponent },
    { path: '', redirectTo: '/app-login', pathMatch: 'full' },
    { path: 'app-leavestrainings', component: LeavesTrainingComponent },
    { path: 'app-ltcalendar', component: LTCalendarComponent },
    { path: 'app-member', component: MemberComponent },
    { path: 'app-jarlocationdetails', component: JarLocationDetailsComponent },
    { path: 'app-sprint-planning', component: SprintPlanningComponent},
    { path: 'app-sprint-details', component: SprintDetailsComponent},
    { path: 'app-login', component: LoginComponent},
    { path: 'app-pair-programming', component: PairProgramComponent},
    { path: 'app-scrum-attendance', component: ScrumComponent}
];
