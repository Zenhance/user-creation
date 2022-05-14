import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, retry, tap, throwError} from "rxjs";
import {UserModel} from "../users/user.model";
import {UserService} from "./user.service";


@Injectable({providedIn:"root"})

export class DataService{
  constructor(private http:HttpClient, private userService:UserService) {
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  postUser(userInfo):void{
    this.http.post(
      'https://usercreationapi.azurewebsites.net/api/users',
      userInfo
    )
      .subscribe(
        response => {console.log(response)},
        error => {console.log(error)}
      );
  };

  getUsers(){
    return this.http.get<UserModel[]>(
      'https://usercreationapi.azurewebsites.net/api/users',
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  };
}
