import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/share/auth.service';
import { TokenStorage } from 'src/app/share/token-storage.service';

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
  }

  ngOnInit() {
    this.username = this.tokenStorage.getUsername();
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
