import {Injectable} from "@angular/core";
import {UserModel} from "../users/user.model";
import {Subject} from "rxjs";

@Injectable({providedIn:"root"})

export class UserService{
  userChanged = new Subject<UserModel[]>();

  private users:UserModel[] = [];

  addUser(users:UserModel):void{
    this.users.push(users);
    this.userChanged.next(this.users.slice());
  }

  getUsers():UserModel[]{
    return this.users.slice();
  }

  setUsers(users: UserModel[]):void {
    this.users = users;
  }
}
