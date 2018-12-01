import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '@/_services/authentication.service';

@Component({templateUrl: 'register.component.html'})

export class RegisterComponent {
      
    credentials: TokenPayload = {
      email: '',
      password: '',
    };
  
    constructor(private auth: AuthenticationService, private router: Router) {}
  
    register() {
      this.auth.register(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/edit');
      }, (err) => {
        console.error(err);
      });
    }
  }