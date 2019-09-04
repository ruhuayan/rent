import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { NotFoundComponent } from './errors/notFound.component';
import { AuthenticationService } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TokenStorage } from '../auth/token-storage.service';

@NgModule({
	declarations: [
        PagesComponent,
        HeaderComponent,
        NotFoundComponent,
	],
	imports: [
		CommonModule,
        PagesRoutingModule,
        HttpClientModule,
        MaterialModule
	],
	providers: [AuthenticationService, TokenStorage]
})
export class PagesModule {}
