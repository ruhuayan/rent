import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';
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
  loginForm: FormGroup;
  signupForm: FormGroup;
  forgotForm: FormGroup;
  formVars = {
    login: {
      inputType: 'password',
      visible: true
    },
    signup: {
      inputType: 'password',
      visible: true,
      submitted: false
    },
    repass: {
      inputType: 'password',
      visible: true
    }
  }

  formType = 'login';
  matcher = new MyErrorStateMatcher();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
      rememberme: [false, ]
    });
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: [''],
      acceptTerms: [false, Validators.requiredTrue]
    }, {validators: this.checkPasswords});
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ]
    });
  }
  private checkPasswords(fb: FormGroup): {notSame: boolean} {
    return fb.get('password').value === fb.get('repassword').value ? null : {notSame: true};
  }
  togglePassword(inputName): void {
    this.formVars[inputName].visible = !this.formVars[inputName].visible ;
    this.formVars[inputName].inputType = this.formVars[inputName].visible ? 'password' : 'text';
  }
  openForm(formType): void {
    this.formType = formType;
  }

  login(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
  signup(): void {
    this.formVars.signup.submitted = true;
    console.log(this.signupForm);
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
  }
  recover(): void { console.log(this.forgotForm.value);
  }
}
