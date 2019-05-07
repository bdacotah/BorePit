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
  threadDeleted: boolean = false;

  constructor(public thrdService: ThreadsService, private router: Router, private route: ActivatedRoute ) { }

  // Honestly, I feel bad because I'm not sure why this works or how it works, but it does so I'm afraid of touching it right now.
  ngOnInit() {
    this.currentThread = this.thrdService.thread;
    this.currentThreadDoc = this.thrdService.threadDoc;
    if (this.currentThread == null) {
      this.router.navigate(['/threads'])
    }
  }

  //  Same as above....
  deleteThread(thread: Thread){
    this.threadDeleted = true;
    this.thrdService.deleteThread(thread)
    this.router.navigate(['/threads'])
  }

}
