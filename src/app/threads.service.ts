import { Injectable } from '@angular/core';
import { Thread } from './thread';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ThreadsComponent } from './threads/threads.component';

@Injectable()
export class ThreadsService {
  // Google Firebase items:
  threadCollection: AngularFirestoreCollection<Thread>;     // This is our firestore collection of type Thread that we use to get info from our database
  threadDoc: AngularFirestoreDocument<Thread>;              // This is the individual thread before it becomes a thread in our web app

  // Items we use from converted Firebase items:
  threads: Observable<Thread[]>;                            // This is our Observable of threads that we use to view our current threads when the page first loads
  savedThreads: Thread[];                                   // This is our backup array of threads that our app uses to view our threads after we switch components
  public thread: Thread;                                    // This is where we store the individual thread that we view in thread details
  
  // Where all the thread magic happens:
  constructor(public afs: AngularFirestore) {
    this.threadCollection = this.afs.collection('Media Postings', ref => ref.orderBy('DateTime','desc')); // This is where we get our colelction from our database and sort it (threadCollection)
    this.threads = this.threadCollection.snapshotChanges().pipe(map(changes => {                          // This is where we get our observable, and this fancy way of doing so
      return changes.map(a => {                                                                           // allows us to get the id of each thread so that we can remove them (threads)
        const data = a.payload.doc.data() as Thread;
        data.id = a.payload.doc.id;
        return data;
      });
    }))
    this.setBackupThreads()
  }
  // This is where we get our convert our observable (threads) into a backup array of type Thread that our app will default to after switching views
  // since it likes to be fussy and discard our observable when doing so. (savedThreads)
    setBackupThreads(){
      this.threads.subscribe(info => {
        this.savedThreads = info
      })
    }

    // This is used in our threads components ngOnInit lifecycle hook, it is what gives that component the initial threads that you see
    getThreads():Observable<Thread[]>{
      return this.threads;
    }

    // Self explanatory, just responsible for adding our threads to the collection
    addThread(thrd: Thread){
      this.threadCollection.add(thrd);
    }

    // This will fill our threads components threads array after switching back to it, w/o this method in the init of our threads component
    // the threads will not load after switching views
    replenishThreads(){
      return this.savedThreads;
    }

    // This is what is used to grab the specific thread we wish to view. In our html portion of our threads component, each thread link calls to this method essentially
    onClick(thread: Thread){
      this.threadDoc = this.afs.doc(`Media Postings/${thread.id}`)
      //  this.threadDoc.ref.get().then(function(doc) {                    // <--- This chunk is for debugging, it lets us know if we have a thread or not
      //    if (doc.exists){
      //    console.log("Document data:", doc.data()); }
      //    else {
      //      console.log("No such document");
      //    }
      //  });
      this.thread = thread;
    }

    // This is for deleting threads
    deleteThread(thread: Thread){
      this.threadDoc = this.afs.doc(`Media Postings/${thread.id}`)
      this.threadDoc.delete();
     }

     // This will hopefully be the function that will sort our threads (not working atm)
     changeOrder(id){
      console.log(id) 
      this.threadCollection = this.afs.collection('Media Postings', ref => ref.orderBy('DateTime',id));
      this.setBackupThreads();
     }

}
