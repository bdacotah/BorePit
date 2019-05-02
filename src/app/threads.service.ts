import { Injectable } from '@angular/core';
import { Thread } from './thread';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ThreadsService {
  public thread: Thread;
  threads: Observable<Thread[]>;
  threadCollection: AngularFirestoreCollection<Thread>;
  threadDoc: AngularFirestoreDocument<Thread>;
  savedThreads: Thread[];
  currentThreadId: string = null;


  constructor(public afs: AngularFirestore) {
    this.threads = this.afs.collection('Media Postings').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Thread;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    // This gives us a backup of what we initially gather up here ^ for our threads component to draw from when it can't subscribe on it's own
    // The only drawback is new information won't load until you've switched views... but this won't be a problem, because
    // users won't be able to tell the difference because they won't be manually changing info on the backend
    this.threads.subscribe(info => {
      this.savedThreads = info
    })

    this.threadCollection = this.afs.collection('Media Postings');
    
  }

    getThreads():Observable<Thread[]>{
      return this.threads;
    }

    addThread(thrd: Thread){
      this.threadCollection.add(thrd);
    }

    replenishThreads(){
      return this.savedThreads;
    }

    onClick(thread: Thread){
      this.threadDoc = this.afs.doc('Media Postings/${thread.id}')
      this.thread = thread;
      console.log(this.threadDoc)
    }

    // removeThread(thrd: Thread){
    //   this.threadDoc = this.afs.doc()`threads/${item.id}`;
    // }

}
