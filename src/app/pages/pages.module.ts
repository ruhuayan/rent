import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { NotFoundComponent } from './errors/notFound.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../redux/auth.reducer';
import { SharedModule } from '../share/shared.module';
@NgModule({
	declarations: [
        PagesComponent,
        HeaderComponent,
        NotFoundComponent,
	],
	imports: [
		CommonModule,
        PagesRoutingModule,
        SharedModule,
        MaterialModule,
        StoreModule.forRoot({ iStates:  authReducer}),
	],
	providers: []
})
export class PagesModule {}
