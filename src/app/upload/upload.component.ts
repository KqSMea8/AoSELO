import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '@/_services/authentication.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { Games } from '@/_services/games.service';
import { Rank } from '@/_services/rank.service';
import { Game } from '@/_models/games';
import { Player } from '@/_models/players';
import { Subscription, Observable } from 'rxjs';
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
  loggedInSub: Subscription;
  routeSub: Subscription;
  playerSub: Subscription;
  games: Game[];
  id: number;
  playerOne: number;
  playerTwo: number;
  player: Player = new Player;
  gameCheck: Game = new Game;
  playerListSub: Subscription
  searchQuery: string[] = [];
  playerList: Player = new Player;
  playerFound = false;
  filteredPlayers: Player[];
  factionGAs = [
    { name: 'Chaos', value: 'chaosRank' },
    { name: 'Death', value: 'deathRank' },
    { name: 'Destruction', value: 'desRank' },
    { name: 'Order', value: 'orderRank' }
  ]
  P1GA: string[] = [];
  P2GA: string[] = [];
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
  searchForm: FormGroup;
  uploadForm: FormGroup;
  formSub: Subscription;
  message: string;

  constructor(private router: Router, public auth: AuthService, public game: Games,
              private rank: Rank, public fs: FilterSortService, private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

   
  ngOnInit() {
    this._getGames();
    this.toggleEditForm(false);
    this._getPlayerList();
    this.loggedInSub = this.auth.currentUser.subscribe(loggedIn => {
      this.loading = true;
      if (loggedIn) {
        this._routeSubs();
      }
    });
    this.searchForm = this.formBuilder.group({
      searchBy: null,
      playerId: null,
      email: null,
      username: null
    });
    this.uploadForm = this.formBuilder.group({
      playerOne: null,
      playerTwo: null,
      playerOneResult: [null, Validators.required],
      playerTwoResult: [null, Validators.required],
      battlePlan: [null, Validators.required],
      pointsLevel: [null, Validators.required],
      P1GA: null,
      P2GA: null,
      playerOneFaction: [null, Validators.required],
      playerTwoFaction: [null, Validators.required],
      playerOneList: [null, Validators.required],
      playerTwoList: [null, Validators.required]
    });
    this.uploadForm.get('P1GA').valueChanges.subscribe(value => {
      this.P1GA = [];
      this.P1GA.push(value);
    });
    this.uploadForm.get('P2GA').valueChanges.subscribe(value => {
      this.P2GA = [];
      this.P2GA.push(value);
    });
    this.searchForm.get('searchBy').valueChanges.subscribe(value => {
      this.searchQuery = [];
      this.searchQuery.push(value);
    })
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
  
  
  
  get s() {return this.searchForm.controls;}

  findPlayers() {
    if (this.searchForm.invalid) {
      return;
    }

    let formValue = this.searchForm.value;

    for (let prop in formValue) {
      if (!formValue[prop]) {
        delete formValue[prop];
      }
      if (formValue.searchBy) {
        delete formValue.searchBy;
      }
      if (Array.isArray(formValue[prop])) {
        let resultArray = formValue[prop].filter((item: any) => item);
        if (resultArray.length > 0 ) {
          formValue[prop] = resultArray;
        }
      }
    }
    this.rank.findPlayer(formValue)
    .subscribe(
      result => {
        this.playerList = result;
        console.log(formValue);
        this.playerFound = true;
      },
      error => {
          console.log("Error", error);
      });    
  }

  submitGame() {
    
    this.uploadForm.controls['playerOne'].setValue(this.player.playerId);
    this.uploadForm.controls['playerTwo'].setValue(this.playerList.playerId);

    //console.log(this.uploadForm.value);
    this.game.upload(this.uploadForm.value)
      .subscribe();
    this.submitted = true;
    this.formSub = this.uploadForm.value;
  }

  onSubmitGame(e: any) { 
    if (e.game) {
      this.playerGame = e.game;
      this.toggleEditForm(false);
    }}

  ngOnDestroy() {
    this.playerListSub.unsubscribe();
    this.gamesSub.unsubscribe();
    this.playerSub.unsubscribe();
  }
}

