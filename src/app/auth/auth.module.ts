import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '', component: AuthComponent,
        children: [
        ]
    },
];
@NgModule({
	declarations: [
        AuthComponent,
	],
	imports: [
		CommonModule,
        MaterialModule,
        RouterModule.forChild(routes)
	],
	providers: []
})
export class AuthModule {}