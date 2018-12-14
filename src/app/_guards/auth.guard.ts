import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private route: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var currentUser = this.auth.currentUserValue;
    if (currentUser) {
      //logged in so return true
      return true;
    }
    // not logged in, redirecto to login page with the return URL
    this.route.navigateByUrl('/login', { queryParams: { returnURL: state.url }});
    return false;
  }
}