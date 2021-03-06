import { Component, OnInit } from '@angular/core';
import {ThreadsService} from '../threads.service';
import {Thread} from "../thread";
import {fromEventPattern} from 'rxjs';
import {firestore} from 'firebase/app';
import {Timestamp} from '@firebase/firestore-types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {


thrd: Thread = {
  Category: "",
  Content: "",
  DateTime: firestore.Timestamp.now(),
  Title: ""
}

  constructor(private thrdService: ThreadsService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.thrd.Content != "" && this.thrd.Title != '' && this.thrd.Category != '')
      this.thrdService.addThread(this.thrd);
    this.thrd.Content = "";
    this.thrd.Category = "";
    this.thrd.Title = "";
    this.router.navigateByUrl('/threads')
    console.log('created thread')
  }

}
