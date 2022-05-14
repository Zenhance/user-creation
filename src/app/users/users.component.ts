import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "./user.model";
import {Subscription} from "rxjs";
import {DataService} from "../shared/data.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,OnDestroy {
  users: UserModel[];
  private subscription: Subscription;

  constructor(private dataService:DataService,private userService:UserService) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((data:UserModel[])=>{
      console.log(data);
      this.users = data;
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

}
