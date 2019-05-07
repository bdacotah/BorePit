import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { CreateThreadComponent } from "./create-thread/create-thread.component";
import { ThreadsComponent} from "./threads/threads.component";
import { ThreadDetailComponent } from "./thread-detail/thread-detail.component";
import { AboutComponent } from './about/about.component';
import { LoadingComponent } from './loading/loading.component';

const routes: Routes = [
  {path: 'createthread', component: CreateThreadComponent},
  {path: '', redirectTo: 'threads', pathMatch: 'full'},
  {path: 'threads', component: ThreadsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'threaddetails', component: ThreadDetailComponent},
  {path: 'loading', component: LoadingComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
