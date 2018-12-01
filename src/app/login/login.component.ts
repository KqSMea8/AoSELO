import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '@/_services/authentication.service';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent {
    
      credentials: TokenPayload = {
        email: '',
        password: ''
      };
    
      constructor(private auth: AuthenticationService, private router: Router) {}
    
      login() {
        this.auth.login(this.credentials).subscribe(() => {
          this.router.navigateByUrl('/profile');
        }, (err) => {
          console.error(err);
        }); 
      }
}