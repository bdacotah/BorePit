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

  


  constructor(public afs: AngularFirestore) {
    this.threadCollection = this.afs.collection('Media Postings', ref => ref.orderBy('DateTime','desc')); // <- This is where the default order is
    this.threads = this.threadCollection .snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Thread;
        data.id = a.payload.doc.id;
        return data;
      });
    }))
    // This(v) gives us a backup of what we initially gather up here (^) for our threads component to draw from when it can't subscribe on it's own
    // The only drawback is new information won't load until you've switched views... but this won't be a problem, because
    // users won't be able to tell the difference because they won't be manually changing info on the backend
    this.threads.subscribe(info => {
      this.savedThreads = info
    })
    
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
      this.threadDoc = this.afs.doc(`Media Postings/${thread.id}`)
       this.threadDoc.ref.get().then(function(doc) {
         if (doc.exists){
         console.log("Document data:", doc.data()); }
         else {
           console.log("No such document");
         }
       });
      this.thread = thread;
      console.log(this.thread)
    }

    deleteThread(thread: Thread){
      this.threadDoc = this.afs.doc(`Media Postings/${thread.id}`)
      this.threadDoc.delete();
     }

     changeOrder(id){
      console.log(id) 
      this.threadCollection = this.afs.collection('Media Postings', ref => ref.orderBy('DateTime',id));
     }

}
