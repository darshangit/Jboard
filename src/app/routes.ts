import { Routes } from '@angular/router';
import { RetroComponent, LeavesTrainingComponent, LTCalendarComponent, MemberComponent, JarLocationDetailsComponent } from './index';


export const appRoutes: Routes = [
    { path: 'app-retro', component: RetroComponent },
    { path: '', redirectTo: '/app-ltcalendar', pathMatch: 'full' },
    { path: 'app-leavestrainings', component: LeavesTrainingComponent },
    { path: 'app-ltcalendar', component: LTCalendarComponent },
    { path: 'app-member', component: MemberComponent },
    { path: 'app-jarlocationdetails', component: JarLocationDetailsComponent }
];
