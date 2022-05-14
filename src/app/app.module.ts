import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import { HeaderComponent } from './header/header.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { UserCreationComponent } from './user-creation/user-creation.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserCreationComponent,
    UsersComponent,
    UserComponent
  ],
    imports: [
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
