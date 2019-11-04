import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { SpinnerButtonOptions } from 'src/app/spinner-button/button-options.interface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    events: string[] = [];
    opened = true;

    matcher = new MyErrorStateMatcher();
    accountForm: FormGroup;
    securityForm: FormGroup;
    companyForm: FormGroup;

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
            private fb: FormBuilder
        ) { }

    ngOnInit() {
        this.accountForm = this.fb.group({
            firstname: [''],
            lastname: [''],
            username: ['', [Validators.required, Validators.email] ]
        });

        this.securityForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
        });

        this.companyForm = this.fb.group({
          name: ['', [Validators.required] ],
          phone: ['', [Validators.required] ],
          address: [''],
          city: [''],
          province: [''],
          postal: ['']

        });
    }

    updateAccount(): void {

    }

    updatePassword(): void {

    }

    updateCompant(): void {

    }
}
