import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { SpinnerButtonModule } from 'src/app/spinner-button/spinner-button.module';

const routes: Routes = [
  {
    path: '', component: ProfileComponent
  },
];

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SpinnerButtonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class ProfileModule {}
