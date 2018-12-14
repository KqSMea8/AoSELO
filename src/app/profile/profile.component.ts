import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@/_services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from '@/_models/players';
import { Rank } from '@/_services/rank.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {
  id: number;
  loggedInSub: Subscription;
  routeSub: Subscription;
  playerSub: Subscription;
  player: Player;
  loading: boolean;
  error: boolean;

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private rank: Rank) {}
 
  onClick() {
    this.auth.logout();
  }
  
  ngOnInit() {
    this.loggedInSub = this.auth.currentUser.subscribe(loggedIn => {
      this.loading = true;
      if (loggedIn) {
        this._routeSubs();
      }
    });
  }

  private _routeSubs() {
    // set playerId from route params and subscribe
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['playerId'];
      this._getPlayer();
    });
  }

  private _getPlayer() {
    this.loading = true;
    // Get player by playerID
    this.playerSub = this.rank.getPlayer(this.id).subscribe(res =>{
      this.player = res;
      this.loading = false;
    },
    err => {
      console.error(err);
      this.loading = false;
      this.error = true;
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe;
    this.playerSub.unsubscribe;
  }
}
