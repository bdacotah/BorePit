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

  constructor(private thrdService: ThreadsService, private router: Router) { }

  ngOnInit() {
    this.thrdService.getThreads()
    .subscribe(threads => {this.threads = threads
    console.log(threads);
  })
  }

  // ngOnChanges()
  // {
  //   this.thrdService.getThreads()
  //   .subscribe(data => {this.threads = threads
  //   console.log(data);
  // })
  // }


  testFunc(){
    
    this.router.navigate(['/threads'])
    console.log("testfunc ran")
  }

}
