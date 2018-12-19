import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as ObservableThrowError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { AuthService } from "@/_services/authentication.service";
import { Player } from '@/_models/players';

const baseUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})

export class Rank {

    constructor (private auth: AuthService, private http: HttpClient) {}

    private get _authHeader(): string {
        return `${this.auth.currentUser}`;
      }

    getPlayers(): Observable<any>{
        return this.http.request('get', `${baseUrl}/players/`);
    }

    getPlayer(id: number): Observable<any> {
        return this.http.request('get', `${baseUrl}/profile`,
        {headers: new HttpHeaders().set("Authorization", this._authHeader)})
            .pipe(catchError((error) => error)
        );
    }

    findPlayer(playerId: number) {
        return this.http.get(`${baseUrl}/player/${playerId}`);
    }

}