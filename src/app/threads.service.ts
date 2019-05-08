import { Injectable} from '@angular/core';
import { Thread } from './thread';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject} from 'rxjs';



@Injectable()
export class ThreadsService{

  ascOrDesc = "desc"; // <--- sorting variable (default is desc) Right now it's only used initially, if time allows, we can incorporate further
  category = "all";   // <--- our category sorting variable
  categories = ["Science", "Technology", "Gaming", "News", "Humor", "Pop Culture", "Movies & Television", "Random"]; // This is our array of categories that threads can be

  // Google Firebase items:
  threadCollection: AngularFirestoreCollection<Thread>;     // This is our firestore collection of type Thread that we use to get info from our database
  threadDoc: AngularFirestoreDocument<Thread>;              // This is the individual thread before it becomes a thread in our web app

  // Items we use from converted Firebase items:
  threads: Observable<Thread[]>;                            // This is our Observable of threads that we use to view our current threads when the page first loads
  public thread: Thread;                                    // This is where we store the individual thread that we view in thread details
  
  // Where all the thread magic happens:
  constructor(public afs: AngularFirestore, private router: Router) {
    this.getAndOrderThreads(this.ascOrDesc);
    this.setThreads();
  }

    // This gets our collection of threads from our Firestore (afs[angular fire store])
    getAndOrderThreads(id){
      console.log("ordering by " +id)
      if (this.category == "all"){
        console.log("sorting default")
        this.threadCollection = this.afs.collection('Media Postings', ref => ref.orderBy('DateTime', id));
      } else {
        console.log("sorting custom")
        this.threadCollection = this.afs.collection('Media Postings', ref => ref.where('Category', '==', this.category).orderBy('DateTime', id));
      }
    }


    // This takes our threadCollection and turns it into an Observable
    // The fancy stuff with the pipe(map(changes(etc))) is necessary for us
    // to retrieve an ID from our threads in our collection so that we can delete them
    // and assign them to our thread variable for viewing.
    setThreads(){
      this.threads = this.threadCollection.snapshotChanges().pipe(map(changes => {                          // This is where we get our observable, and this fancy way of doing so
        return changes.map(a => {                                                                           // allows us to get the id of each thread so that we can remove them (threads)
          const data = a.payload.doc.data() as Thread;
          data.id = a.payload.doc.id;
          return data;
        });
      }))
    }

    // This is used in our threads components ngOnInit lifecycle hook, it is what gives that component the initial threads that you see
    getThreads():Observable<Thread[]>{
      return this.threads;
    }

    // Self explanatory, just responsible for adding our threads to the collection
    addThread(thrd: Thread){
      this.threadCollection.add(thrd);
    }

    // This is what is used to grab the specific thread we wish to view. In our html portion of our threads component, each thread link calls to this method essentially
    onClick(thread: Thread){
      // this.threadDoc = this.afs.doc(`Media Postings/${thread.id}`)
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

     // This is a way to reload the component to view the updated ngFor loop using the modified order
     changeOrder(id: string){
        this.getAndOrderThreads(id)
        this.setThreads();
        console.log("changing order")
        this.router.navigateByUrl('/loading');
     }

     changeCategory(category){
        this.category = category;
        console.log("New category:" + this.category)
        this.getAndOrderThreads(this.ascOrDesc)
        this.setThreads();
        this.router.navigateByUrl('/loading');
     }

}
