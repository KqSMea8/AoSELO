import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@/_services/authentication.service';

@Component({templateUrl: 'register.component.html'})

export class RegisterComponent {
  
    constructor(private auth: AuthService, private router: Router) {}
  
  }