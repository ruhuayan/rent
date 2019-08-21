import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  formVars = {
    login: {
      inputType: 'password',
      visible: true
    },
    signup: {
      inputType: 'password',
      visible: true
    },
    repass: {
      inputType: 'password',
      visible: true
    }
  }
  
  formType = 'login';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  constructor() { }

  ngOnInit() {
  }

  togglePassword(inputName) {
    this.formVars[inputName].visible = !this.formVars[inputName].visible ; 
    this.formVars[inputName].inputType = this.formVars[inputName].visible ? 'password' : 'text';
  }
  openForm(formType) {
    this.formType = formType;
  }
}
