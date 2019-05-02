import { Component, OnInit } from '@angular/core';
import { ThreadsService} from '../threads.service';
import { Thread } from '../thread';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit {

  currentThread: Thread;
  threads: Thread[] = [];

  constructor(public thrdService: ThreadsService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.currentThread = this.thrdService.thread;
    if (this.currentThread == null) {
      this.router.navigate(['/threads'])
    }
  }

}
