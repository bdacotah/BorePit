import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ThreadsComponent } from './threads/threads.component';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { UserBarComponent } from './user-bar/user-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppBodyComponent } from './app-body/app-body.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import { ThreadsService } from './threads.service';
import { CreateThreadComponent } from './create-thread/create-thread.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThreadsComponent,
    ThreadDetailComponent,
    UserBarComponent,
    DashboardComponent,
    AppBodyComponent,
    CreateThreadComponent,
    AboutComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'borepit'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
