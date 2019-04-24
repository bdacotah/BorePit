import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ThreadsComponent } from './threads/threads.component';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { UserBarComponent } from './user-bar/user-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppBodyComponent } from './app-body/app-body.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThreadsComponent,
    ThreadDetailComponent,
    UserBarComponent,
    DashboardComponent,
    AppBodyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
