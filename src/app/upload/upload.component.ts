import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Router } from '@angular/router'
import { Games } from '@/_services/games.service';
import { Rank } from '@/_services/rank.service';
import { Game } from '@/_models/games';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  id: string;
  factions = [
    'Ironjawz', 'Blades of Khorne',
    'Destruction', 'Legion of Blood',
    'Stormcast', 'Kharadron Overlords'];
  battleplans = [
    'Battle for the Pass', 'Starstrike',
    'Border War', 'Escalation'
  ];
  results = [
    'Major Victory', 'Minor Victory',
    'Minor Loss', 'Major Loss', 'Draw'
  ]
  

  submitted = false;

  onSubmit() { this.submitted=true; }

  constructor(private router: Router,public oktaAuth: OktaAuthService, public Game: Games,
              private rank: Rank) { }

   
  ngOnInit() {
    if (this.oktaAuth.isAuthenticated()) {

    // Get user information  
      const userInfo = this.rank.getPlayer('');
    }
  } 

  submitGame() {
    this.Game.upload(new Game);
   // this.submitted = true;
  }
}

