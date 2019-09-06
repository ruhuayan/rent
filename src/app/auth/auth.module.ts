import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SpinnerButtonModule } from '../spinner-button/spinner-button.module';
import { MatSnackBarModule } from '@angular/material';
import { SharedModule } from '../share/shared.module';
const routes: Routes = [
    {
        path: '', component: AuthComponent
    },
];
@NgModule({
  declarations: [
        AuthComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    SpinnerButtonModule,
    SharedModule
  ],
  providers: []
})
export class AuthModule {}
