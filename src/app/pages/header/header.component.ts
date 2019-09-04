import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { TokenStorage } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  // @Input('username') username: string;
  username = '';
  constructor(
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage
  ) {
    // this.username = this.tokenStorage.getUsername();
   }

  ngOnInit() {
    this.authService.username$.subscribe(
      res => {
        console.log(res);
        this.username = res;
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }

}
