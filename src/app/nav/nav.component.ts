import { Component, OnInit } from '@angular/core';
import { AuthService } from '@/_services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  isAuthenticated: boolean;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.currentUser) {this.isAuthenticated = true;}
  }

  onClick() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

}
