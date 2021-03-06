import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from '../share/auth.service';
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

    if (this.loginForm.valid) {
      this.spinner.active = true;
      this.authService.login(this.loginForm.value as Credential).subscribe(
        res => {
          if (typeof res !== 'undefined') {
            this.router.navigate(['/'], { state: { username: this.loginForm.value.username }});
          } else {
            this.showMsg('Login failed', false);
          }
          this.spinner.active = false;
          // this.cdr.detectChanges();
        },
        err => {
          console.log(err);
          this.spinner.active = false;
          this.showMsg(err.error.detail || err.message, false);
        }
      );
    }
  }
  signup(): void {

    this.formVars.signup.submitted = true;
    if (this.signupForm.valid) {
      this.spinner.active = true;
      console.log(this.signupForm.value);
      this.authService.register(this.signupForm.value as Credential).subscribe(res => {
        if (typeof res !== 'undefined') {
          this.router.navigate(['/']);

          this.showMsg('Check your email to activate the account', true);
        } else {
          this.showMsg('Register failed', false);
        }
        this.spinner.active = false;
        this.cdr.detectChanges();
      },
      err => {
        console.log(err);
        this.spinner.active = false;
        this.showMsg(err.error.detail || err.message, false);
      });
    }
  }
  recover(): void {

    if (this.forgotForm.valid) {
      this.spinner.active = true;
      console.log(this.forgotForm.value);
      this.authService.requestPassword(this.forgotForm.value).subscribe(
        res => {
          if (typeof res !== 'undefined') {
            this.showMsg('Check your email to activate the account', true);
          } else {
            this.showMsg('Reset Password Request failed', false);
          }

          this.spinner.active = false;
        }, err => {
          this.spinner.active = false;
          this.showMsg(err.error.detail || err.message, false);
        }
      );
    }
  }

  private showMsg(msg: string, success: boolean): void {
    this.snackBar.open(msg, 'close', {panelClass: [success? 'snack-success': 'snack-error'], duration: (success? 3000 : 1500)});
  }
}
