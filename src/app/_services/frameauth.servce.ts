import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Player } from '@/_models/players';

const baseUrl = 'http://localhost:9000/api';
var id = '';

@Injectable()

export class FrameAuth {

    userExists: boolean;
    isAdmin: boolean;
    isLoggedIn: boolean;
    accessToken: string;
    userProfile: any;
    expiresAt: number;
    user: Player;

    constructor (public http: HttpClient) {}

    signUp() {
        return this.http.request('post', `${baseUrl}/signup`);
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${baseUrl}/login`, {username: username, password: password})
            .pipe(map(user => {
                if (user) {
                   JSON.stringify(user);
                }
                return user;
            }));
    }

    logout() {
        return this.http.request('delete', `${baseUrl}/logout`);
    }

    verifyLogin() {
        this.isLoggedIn=false;
        var query = this.http.request('get', `${baseUrl}/sessions/my`);
        if (query) {
        this.isLoggedIn=true;
        }
    }

    doPasswordLost() {
        return this.http.request('post', `${baseUrl}/login/forgot`)
    }

    doPasswordReset() {
        return this.http.request('post', `${baseUrl}/login/reset`)
    }

    findUser() {}

    getIsAdmin() {}

    private _setSession(authResult: any, profile?: any) {
        this.expiresAt = (authResult.expiresIn * 1000) + Date.now();
        // Store expiration in local storage to access in constructor
        localStorage.setItem('expires_at', JSON.stringify(this.expiresAt));
        this.accessToken = authResult.accessToken;
        // If initial login, set profile and admin information
        if (profile) {
          this.userProfile = profile;
        // this.isAdmin = this.getIsAdmin(profile);
        }
        // Update login status in loggedIn$ stream
        //this.setLoggedIn(true);
        //this.loggingIn = false;
        // Schedule access token removal
        //this.scheduleRenewal();
      }
}