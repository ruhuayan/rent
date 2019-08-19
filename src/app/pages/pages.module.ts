import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { NotFoundComponent } from './errors/notFound.component';

@NgModule({
	declarations: [
        PagesComponent,
        HeaderComponent,
        NotFoundComponent,
	],
	imports: [
		CommonModule,
        PagesRoutingModule,
        MaterialModule
	],
	providers: []
})
export class PagesModule {}