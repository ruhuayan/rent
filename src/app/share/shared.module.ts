import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './shared.service';
import { TokenStorage } from './token-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ SharedService, TokenStorage, AuthenticationService ],
})
export class SharedModule { }
