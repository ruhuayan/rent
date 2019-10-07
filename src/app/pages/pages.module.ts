import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { NotFoundComponent } from './errors/notFound.component';
import { SharedModule } from '../share/shared.module';
import { AuthModule } from '../auth/auth.module';
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
    AuthModule,
    // StoreModule.forRoot({ iStates:  authReducer}),
	],
	providers: []
})
export class PagesModule {}
