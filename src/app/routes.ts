import { Routes } from '@angular/router';
import { RetroComponent, LeavesTrainingComponent } from './index';

export const appRoutes: Routes = [
    { path: 'app-retro', component: RetroComponent },
    { path: '', redirectTo: '/app-retro', pathMatch: 'full' },
    { path: 'app-leavestrainings', component: LeavesTrainingComponent },

];
