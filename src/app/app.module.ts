import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppNavBarComponent } from './navbar/navbar.component';
import { appRoutes } from './routes';
import { RetroComponent } from './index';
import { RetroHistoryComponent } from './retro-history/retro-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RetroService } from './service/retro.services';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
 ],
  declarations: [
    AppComponent,
    AppNavBarComponent,
    RetroComponent,
    RetroHistoryComponent
  ],
  providers: [
    RetroService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

