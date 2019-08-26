import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TokenStorage } from './token-storage.service';
import { SpinnerButtonModule } from '../spinner-button/spinner-button.module';
import { MatSnackBarModule } from '@angular/material';
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
    MaterialModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SpinnerButtonModule
  ],
  providers: [AuthenticationService, TokenStorage]
})
export class AuthModule {}
