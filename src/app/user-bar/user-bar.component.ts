import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ThreadsService} from '../threads.service';
import { ThreadsComponent } from '../threads/threads.component';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {

  filterState: boolean = false;
  order: string = "Newest"

  constructor(
    private location: Location,
    private thrdService: ThreadsService,
  ) {}

  ngOnInit() {
  }
  goBack(): void {
    this.location.back();
  }

  filter(){
    this.filterState = !this.filterState;
    console.log(this.filterState)
  }

  changeOrder(id){
     this.thrdService.changeOrder(id);
  }

}
