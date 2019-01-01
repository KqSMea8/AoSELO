import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENV } from '@/_helpers/env.config';
import { HttpClient } from '@angular/common/http';
import { Player } from '@/_models/players';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<Player>;
    public currentUser: Observable<Player>;

    constructor(public http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Player>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Player {
        return this.currentUserSubject.value;
    }

    register(email: string, username: string, password: string): Observable<Player> {
        var params = {email, username, password}
        return this.http.post<Player>(`${ENV.BASE_API}register`, params)
            .pipe(map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${ENV.BASE_API}login`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    isAdmin() {}

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

       
    editPlayer(player: any) {
        return this.http.post(`${ENV.BASE_API}profile`, player);
    }

    doPasswordLost(email: string) {
        return this.http.post(`${ENV.BASE_API}reset`, {email: email});
    }
    
    passwordReset(resetToken: string, password: string) {
        return this.http.post(`${ENV.BASE_API}reset/${resetToken}`, password);
    }

    passwordChange(password: string) {
        return this.http.post(`${ENV.BASE_API}password`, password);
    }
}