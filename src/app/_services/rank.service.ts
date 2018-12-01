import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OktaAuthService } from "@okta/okta-angular";
import { Player } from '@/_models/players';

const baseUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})

export class Rank {

    players : Observable<Player>;
    
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

    getPlayers() {
        return this.request('get', `${baseUrl}/players/`);
    }

    getPlayer(id: string) {
        return this.http.request('get', `${baseUrl}/players/${id}`);
    }

    register(player: Player) {
        return this.request('post', `${baseUrl}/player`, player);
    }

    editPlayer(player: Player) {
        return this.request('post', `${baseUrl}/player/${player.playerId}`);
    }
}