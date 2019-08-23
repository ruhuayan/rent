import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
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
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
	],
	providers: [UserService]
})
export class AuthModule {}
