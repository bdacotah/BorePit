import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ThreadsService} from '../threads.service';


@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {
  // This is the boolean that keeps track of whether or not our div box will show with
  // our filtering options. It's defaulted to false.
  filterState: boolean = false;

  searchTerm: string = "";

  // Our constructor that uses the location and our ThreadsService
  constructor(
    private location: Location,
    private thrdService: ThreadsService,
  ) {}

  ngOnInit() {
  }

  // This is for our back button, it just navigates back through the routers history
  goBack(): void {
    this.location.back();
  }

  // This toggles the div box to show our filtering options (search box, newest /oldest )
  filter(){
    this.filterState = !this.filterState;
    if (!this.filterState){
      this.thrdService.ascOrDesc = 'desc'
      this.changeCategory('all');
    }
  }

  // This calls upon the changeOrder function in our thread service, the id is essentially
  // a string with the value either 'asc' or 'desc' depending on the choice selected
  changeOrder(id){
     this.thrdService.changeOrder(id);
  }

  changeCategory(category){
    this.thrdService.changeCategory(category);
 }

  clear(){
    this.searchTerm = "";
  }

}
