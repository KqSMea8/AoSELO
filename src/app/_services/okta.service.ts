import { Injectable, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({ providedIn: 'root' })

export class OktaService {

    isAuthenticated: boolean;

    constructor(public oktaAuth: OktaAuthService) {
        this.oktaAuth.$authenticationState.subscribe(
            (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
          );
     }

    async ngOnInit() {
        this.isAuthenticated = await this.oktaAuth.isAuthenticated();
      }
    
    public login() {
        this.oktaAuth.loginRedirect();
      }
    
    public logout() {
        this.oktaAuth.logout('/');
        this.isAuthenticated = false;
    }
    
}