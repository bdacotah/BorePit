import { Component, OnInit } from '@angular/core';
import { ThreadsService} from '../threads.service';
import { Thread } from '../thread';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit {

  threads: Thread[] = [];

  constructor(private thrdService: ThreadsService) { }

  ngOnInit() {
    this.thrdService.getThreads()
    .subscribe(data => {this.threads = data
    console.log(data);});
  }

}
