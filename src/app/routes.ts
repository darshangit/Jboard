import { Routes } from '@angular/router';
import { RetroComponent, LeavesTrainingComponent, LTCalendarComponent, MemberComponent } from './index';

export const appRoutes: Routes = [
    { path: 'app-retro', component: RetroComponent },
    { path: '', redirectTo: '/app-retro', pathMatch: 'full' },
    { path: 'app-leavestrainings', component: LeavesTrainingComponent },
    { path: 'app-ltcalendar', component: LTCalendarComponent },
    { path: 'app-member', component: MemberComponent }
];
