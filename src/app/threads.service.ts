import { Injectable } from '@angular/core';
import { Thread } from './thread';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable} from 'rxjs';

@Injectable()
export class ThreadsService {

  threads: Observable<Thread[]>;
  threadCollection: AngularFirestoreCollection;

  threadDoc: AngularFirestoreDocument<Thread>;

  


  constructor(public afs: AngularFirestore) {
    this.threads = afs.collection('Media Postings').valueChanges();
    this.threadCollection = this.afs.collection('Media Postings');
    }

    getThreads():Observable<Thread[]>{

      console.log(this.threads);
      return this.threads;
    }

    addThread(thrd: Thread){
      this.threadCollection.add(thrd);
    }
}
