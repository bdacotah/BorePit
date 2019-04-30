import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { CreateThreadComponent } from "./create-thread/create-thread.component";
import { ThreadsComponent} from "./threads/threads.component";
import { ThreadDetailComponent } from "./thread-detail/thread-detail.component";

const routes: Routes = [
  {path: 'createthread', component: CreateThreadComponent},
  {path: 'threads', component: ThreadsComponent},
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
