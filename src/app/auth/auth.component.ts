import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthenticationService } from './auth.service';
import { Credential } from './credential.model';
import { Router } from '@angular/router';
import { SpinnerButtonOptions } from '../spinner-button/button-options.interface';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

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

  spinner: SpinnerButtonOptions = {
    active: false,
    spinnerSize: 18,
    raised: true,
    buttonColor: 'primary',
    spinnerColor: 'primary',
    mode: 'indeterminate',
    fullWidth: true
  };
  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
      rememberme: [false, ]
    });
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.email] ],
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
    this.spinner.active = false;
    this.formType = formType;
  }

  login(): void {
    this.spinner.active = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value as Credential).subscribe(
        res => {
          if (typeof res !== 'undefined') {
            this.router.navigate(['/']);
          } else {
            this.snackBar.open('Login failed', 'close', { duration: 2000 });
          }
          this.spinner.active = false;
          this.cdr.detectChanges();
        },
        err => {
          console.log(err);
          this.spinner.active = false;
          this.snackBar.open(err.error.detail, 'close', {panelClass: ['snack-error'] });
        }
      );
    }
  }
  signup(): void {
    this.spinner.active = true;
    this.formVars.signup.submitted = true;
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.authService.register(this.signupForm.value as Credential).subscribe(res => {
        if (typeof res !== 'undefined') {
          this.router.navigate(['/']);
        } else {
        }
        this.spinner.active = false;
        this.cdr.detectChanges();
      });
    } else {
      this.spinner.active = false;
    }
  }
  recover(): void {
    this.spinner.active = true;
    if (this.forgotForm.valid) {
      console.log(this.forgotForm.value);
      this.authService.requestPassword(this.forgotForm.value).subscribe(
        res => {
          if (typeof res !== 'undefined') {

          } else {
          }
          this.spinner.active = false;
        }
      );
    }
  }
}
