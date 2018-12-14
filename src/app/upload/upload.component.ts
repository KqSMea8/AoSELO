import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '@/_services/authentication.service';
import { Router } from '@angular/router'
import { Games } from '@/_services/games.service';
import { Rank } from '@/_services/rank.service';
import { Game } from '@/_models/games';
import { Player } from '@/_models/players';
import { Subscription } from 'rxjs';
import { FilterSortService } from '@/_services/filter-sort.service';
import { OrderFactions, DesFactions,
          ChaosFactions, DeathFactions, BattlePlans } from '@/_models/data-arrays';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input() gameId: number;
  
  showEditForm = false;
  editBtnText: string;
  playerGame: Game;
  gamesSub: Subscription;
  games: Game[];
  id: string;
  playerListSub: Subscription
  playerList: Player[];
  filteredPlayers: Player[];
  factionGAs = ['Chaos','Death', 'Destruction', 'Order']
  orderFactions = OrderFactions;
  chaosFactions = ChaosFactions;
  desFactions = DesFactions;
  deathFactions = DeathFactions;
  battleplans = BattlePlans;
  results = [
    'Major Victory', 'Minor Victory',
    'Minor Loss', 'Major Loss', 'Draw'
  ]
  players: Player[];
  loading: boolean;
  error: boolean;
  query: '';
  submitted = false;

  constructor(private router: Router, public auth: AuthService, public game: Games,
              private rank: Rank, public fs: FilterSortService) { }

   
  ngOnInit() {
    this._getGames();
    this.toggleEditForm(false);
    this._getPlayerList();
  }

  toggleEditForm(setVal?: boolean) {
    this.showEditForm = setVal !== undefined ? setVal : !this.showEditForm;
    this.editBtnText = this.showEditForm ? 'Cancel Edit' : 'Edit Last Game';
  }

  private _getGames() {
    this.loading = true;
    this.gamesSub = this.game.getGame(this.gameId)
      .subscribe(res => {
        this.games = res;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      });
  }
  
  private _getPlayerList() {
    this.loading = true;
    // Get future, public events
    this.playerListSub = this.rank
      .getPlayers()
      .subscribe(
        res => {
          this.playerList = res;
          this.filteredPlayers = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  searchPlayers() {
  }

  resetQuery() {
    this.query = '';
    this.filteredPlayers = this.playerList;
  }

  submitGame() {
    this.game.upload(new Game);
   // this.submitted = true;
  }

  onSubmitGame(e: any) { 
    if (e.game) {
      this.playerGame = e.game;
      this.toggleEditForm(false);
    }}

  ngOnDestroy() {
    this.playerListSub.unsubscribe();
    this.gamesSub.unsubscribe();
  }
}

