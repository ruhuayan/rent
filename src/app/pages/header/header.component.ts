import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/share/auth.service';
import { SharedService } from 'src/app/share/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  username = '';
  constructor(
    private authService: AuthenticationService,
    private sharedService: SharedService
  ) {
  }

  ngOnInit() {

    this.sharedService.username$.subscribe(
      res => {
        this.username = res;
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }

}
