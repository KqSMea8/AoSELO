import { Component } from '@angular/core';
import { AuthService } from '@/_services/authentication.service';

@Component({
  selector: 'app-logout',
  template: `
    <img src="assets/loading.svg" (click)="onClick()">
  `,
  styles: [`
    :host {
      display: block;
    }
    img {
      display: block;
      margin: 20px auto;
      width: 50px;
      height: 50px;
    }
  `]
})
export class LogoutComponent {

    constructor(public auth: AuthService) {}

    onClick() {
        this.auth.logout();
    }

}
