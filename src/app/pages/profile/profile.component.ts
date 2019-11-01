import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SpinnerButtonOptions } from 'src/app/spinner-button/button-options.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    events: string[] = [];
    opened = true;

    accountForm: FormGroup;
    securityForm: FormGroup;
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
    }

    updateAccount(): void {

    }

    updatePassword(): void {
        
    }
}
