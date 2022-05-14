import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./users/users.component";
import {UserCreationComponent} from "./user-creation/user-creation.component";

const appRoutes:Routes = [
  {path:'',redirectTo:'/users',pathMatch:'full'},
  {path:'users',component:UsersComponent},
  {path:'create',component:UserCreationComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
