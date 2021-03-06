import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatFormField } from '@angular/material'
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Player } from '@/_models/players';
import { AuthService } from '@/_services/authentication.service';
import { Subscription } from 'rxjs';
import { Rank } from '@/_services/rank.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  submitted: boolean;
  loggedInSub: Subscription;
  routeSub: Subscription;
  playerSub: Subscription;
  player: Player = new Player;
  playerId: number;
  
  constructor(public auth: AuthService, public router: Router,
    private formBuilder: FormBuilder, private rank: Rank,
    private route: ActivatedRoute) { }

    createFormGroup() {
      return new FormGroup({
        
      });
    }

    ngOnInit() {
      this.loggedInSub = this.auth.currentUser.subscribe(loggedIn => {
        if (loggedIn) {
          this._routeSubs();
        }
      });
      this.editForm = this.formBuilder.group({
        email: [],
        playerFirstName: [],
        playerLastName: [],
        profilePic: []
      })

    }
  
    private _routeSubs() {
      // set playerId from route params and subscribe
      this.routeSub = this.route.params.subscribe(params => {
        this.playerId = params['playerId'];
        this._getPlayer();
      });
    }
  
    private _getPlayer() {
      // Get player by playerID
      this.playerSub = this.rank.getPlayer(this.playerId).subscribe(res =>{
        this.player = res;
      },
      err => {
        console.error(err);
      });
    }

  get f() {return this.editForm.controls;}

  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    let formValue = this.editForm.value;

    for (let prop in formValue) {
      if (!formValue[prop]) {
        delete formValue[prop];
      }
      if (Array.isArray(formValue[prop])) {
        let resultArray = formValue[prop].filter((item: any) => item);
        if (resultArray.length > 0 ) {
          formValue[prop] = resultArray;
        }
      }
    }
    this.auth.editPlayer(formValue)
    .subscribe(
      edit => {
        this.router.navigateByUrl('/profile');
        console.log("Player Saved", edit);  
      },
      error => {
          console.log("Error", error);
      });    
  }

}
