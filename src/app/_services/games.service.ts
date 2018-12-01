import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OktaAuthService } from "@okta/okta-angular";
import { Game } from '@/_models/games';

const baseUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})

export class Games {

    game : Observable<Game>;

    constructor (public oktaAuth: OktaAuthService, private http: HttpClient) {}

    private async request(method: string, url: string, data?: any) {
        const token = await this.oktaAuth.getAccessToken();

        console.log('request ' + JSON.stringify(data));
        const result = this.http.request(method, url, {
            body: data,
            responseType: 'json',
            observe: 'body',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return new Promise<any>((resolve, reject) => {
            result.subscribe(resolve as any, reject as any);
        });
    }

    getGames() {
        return this.request('get', `${baseUrl}/games/`);
    }

    getGame(id: string) {
        return this.http.request('get', `${baseUrl}/games/${id}`);
    }

    upload(game: Game) {
        return this.request('post', `${baseUrl}/game`, game);
    }

    // editGame(game: Game) {
    //     return this.request('post', `${baseUrl}/games/${game._id}`);
    // }
}