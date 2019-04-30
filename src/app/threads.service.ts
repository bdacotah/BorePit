import { Injectable } from '@angular/core';
import { Thread } from './thread';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ThreadsService {

  threads: Observable<Thread[]>;
  threadCollection: AngularFirestoreCollection<Thread>;
  threadDoc: AngularFirestoreDocument<Thread>;


  constructor(public afs: AngularFirestore) {
    //this.threads = afs.collection('Media Postings').valueChanges();
    this.threads = this.afs.collection('Media Postings').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Thread;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    this.threadCollection = this.afs.collection('Media Postings');
    }

    getThreads():Observable<Thread[]>{

      console.log(this.threads);
      return this.threads;
    }

    addThread(thrd: Thread){
      this.threadCollection.add(thrd);
    }

    // removeThread(thrd: Thread){
    //   this.threadDoc = this.afs.doc()`threads/${item.id}`;
    // }

}
