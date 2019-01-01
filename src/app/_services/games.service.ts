import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as ObservableThrowError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { AuthService } from "@/_services/authentication.service";
import { Game } from '@/_models/games';
import { Router } from '@angular/router';

const baseUrl = 'http://localhost:3000/api';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})

export class Games {

    game : Observable<Game>;

    constructor (public auth: AuthService, private http: HttpClient, private route: Router) {}

    private get _authHeader(): string {
        return `Bearer ${this.auth.currentUser}`;
    }

    getGames(): Observable<any>{
        return this.http.request('get', `${baseUrl}/games/`);
    }

    getGame(id: number) {
        return this.http.request('get', `${baseUrl}/games/${id}`,
        {headers: new HttpHeaders().set("Authorization", this._authHeader)})
            .pipe(catchError((error) => this._handleError(error))
        );
    }

    getLastGame(id: number) {
        return this.http.request('get', `${baseUrl}/games/${id}/game`,
        {headers: new HttpHeaders().set("Authorization", this._authHeader)})
            .pipe(catchError((error) => this._handleError(error))
        );
    }

    editLastGame(id: number) {
        return this.http.request('put', `${baseUrl}/games/${id}/game`,
        {headers: new HttpHeaders().set("Authorization", this._authHeader)})
            .pipe(catchError((error) => this._handleError(error))
        );
    }

    upload(game: Game): Observable<Game>{
        return this.http.post<Game>(`${baseUrl}/game`, game, httpOptions)
            .pipe(catchError((error) => this._handleError(error))
        );
    }

    private _handleError(err: HttpErrorResponse | any): Observable<any> {
        const errorMsg = err.message || 'Error: Unable to complete request.';
        if (err.message && err.message.indexOf('No JWT present') > -1) {
          this.route.navigateByUrl('login');
        }
        return ObservableThrowError(errorMsg);
    }
}