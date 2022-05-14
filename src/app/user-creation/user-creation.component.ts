import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../shared/data.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {
  constructor(private router:Router,private dataService:DataService,private userService:UserService) {
  }
  userCreationForm: FormGroup;
  gender = ['Male','Female'];
  maxDate = new Date();
  minDate = this.createMinDate(0,0,-100);

  ngOnInit(): void {
    this.userCreationForm = new FormGroup({
      'firstName': new FormControl('',[Validators.minLength(2),Validators.maxLength(50),Validators.required]),
      'lastName': new FormControl('',[Validators.minLength(2),Validators.maxLength(50),Validators.required]),
      'city': new FormControl('',[Validators.maxLength(50)]),
      'phone': new FormControl('',[Validators.maxLength(14),Validators.minLength(11),Validators.required]),
      'email':new FormControl('',[Validators.email,Validators.required]),
      'gender': new FormControl('',[Validators.required]),
      'dob': new FormControl('',[Validators.required]),
    })
  }

  createMinDate(days, months, years) {
    let date = new Date();
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);
    return date;
  }

  clearForm(form: FormGroup): void {
    form.reset();
    Object.keys(form.controls).forEach(key =>{
      form.controls[key].setErrors(null)
    });
  }

  onSubmit() {
    this.userCreationForm.value.dob = this.userCreationForm.value.dob.toISOString();
    const userInfo = this.userCreationForm.value;
    this.dataService.postUser(userInfo);
    this.userCreationForm.reset();
    this.clearForm(this.userCreationForm);
    this.userService.addUser(userInfo);
  }
}
