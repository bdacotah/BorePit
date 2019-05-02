import { Component, OnInit } from '@angular/core';
import { ThreadsService} from '../threads.service';
import { Thread } from '../thread';
import { ActivatedRoute, Router} from '@angular/router';
import { AngularFirestoreDocument} from '@angular/fire/firestore';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit {

  currentThread: Thread;
  currentThreadDoc: AngularFirestoreDocument<Thread>;
  threads: Thread[] = [];

  constructor(public thrdService: ThreadsService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.currentThread = this.thrdService.thread;
    this.currentThreadDoc = this.thrdService.threadDoc;
    console.log(this.currentThreadDoc)
    if (this.currentThread == null) {
      this.router.navigate(['/threads'])
    }
  }

  deleteThread(thread: Thread){
    console.log(thread)
    this.thrdService.deleteThread(thread)
    this.router.navigate(['/threads'])
  }

}
