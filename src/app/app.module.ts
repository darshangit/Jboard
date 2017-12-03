import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppNavBarComponent } from './navbar/navbar.component';
import { appRoutes } from './routes';
import { RetroComponent, LeavesTrainingComponent, LTCalendarComponent, MemberComponent,
  SprintPlanningComponent, SprintDetailsComponent, LoginComponent } from './index';
import { RetroHistoryComponent } from './retro-history/retro-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RetroService } from './service/retro.services';
import { HttpModule } from '@angular/http';
import {ScheduleModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, CalendarModule,
  CheckboxModule, TabViewModule, CodeHighlighterModule, DataGridModule, SharedModule,
   InputTextareaModule, DropdownModule, SelectButtonModule, ToggleButtonModule, SliderModule,
   TooltipModule, PasswordModule, GrowlModule } from 'primeng/primeng';
import { MemberService } from './service/member.services';
import { JarLocationService } from './service/jar-location.service';
import { JarLocationDetailsComponent } from './jar-time-creation/jar-details.component';
import { SprintPlanningService } from './service/sprint-planning.service';
import { SprintDetailsService } from './service/sprint-details.service';
import { LoginService } from './service/login.service';
import { AccessControlService } from './service/access-control.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    ScheduleModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    ButtonModule,
    TabViewModule,
    DataGridModule,
    CodeHighlighterModule,
    SharedModule,
    InputTextareaModule,
    DropdownModule,
    SelectButtonModule,
    DataTableModule,
    ToggleButtonModule,
    TooltipModule,
    SliderModule,
    PasswordModule,
    GrowlModule,
    RouterModule.forRoot(appRoutes)
 ],
  declarations: [
    AppComponent,
    AppNavBarComponent,
    RetroComponent,
    RetroHistoryComponent,
    LeavesTrainingComponent,
    LTCalendarComponent,
    MemberComponent,
    JarLocationDetailsComponent,
    SprintPlanningComponent,
    SprintDetailsComponent,
    LoginComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    RetroService,
    MemberService,
    JarLocationService,
    SprintPlanningService,
    SprintDetailsService,
    LoginService,
    AccessControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export class MyModel {

      events: any[];

}

