import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "./user.model";
import {Subscription} from "rxjs";
import {DataService} from "../shared/data.service";
import {UserService} from "../shared/user.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,OnDestroy {
  users: UserModel[];
  private subscription: Subscription;
  pageSlice: UserModel[];

  constructor(private dataService:DataService,private userService:UserService) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((data:UserModel[])=>{
      console.log(data);
      this.users = data;
      this.pageSlice = this.users.slice(0,2);
    });
    this.userService.setUsers(this.users);
    this.subscription = this.userService.userChanged.subscribe(
      (users:UserModel[]) => {
        this.users = users;
      }
    )
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  onPageChange($event: PageEvent) {
    const  startInex = $event.pageIndex * $event.pageSize;
    let endIndex = startInex + $event.pageSize;
    if(endIndex>this.users.length)
      endIndex = this.users.length;
    this.pageSlice = this.users.slice(startInex,endIndex);
  }
}
