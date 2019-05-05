import { Component, OnInit } from '@angular/core';
import {ThreadsService} from '../threads.service';
import {Thread} from "../thread";
import { Router } from '@angular/router';


@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {
  threads: Thread[];
  counter = 0;

  constructor(private thrdService: ThreadsService, private router: Router) { }

  ngOnInit() {
    this.counter++;
    this.thrdService.getThreads()
    .subscribe(threads => {this.threads = threads
    console.log(this.counter);
      console.log(threads);
    
  })
  this.threads = this.thrdService.replenishThreads();
  }

  onClick(event, thread){
    this.thrdService.onClick(thread);
  }
 

}
