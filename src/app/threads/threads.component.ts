import { Component, OnInit } from '@angular/core';
import {ThreadsService} from '../threads.service';
import {Thread} from "../thread";


@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {

  threads: Thread[];

  constructor(private thrdService: ThreadsService) { }

  ngOnInit() {
    this.thrdService.getThreads()
    .subscribe(data => {this.threads = data
    console.log(data);
  })
  }

  ngOnChanges()
  {
    this.thrdService.getThreads()
    .subscribe(data => {this.threads = data
    console.log(data);
  })
  }

}
