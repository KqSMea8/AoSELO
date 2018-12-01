import { Component, OnInit } from '@angular/core';
import { Player } from "@/_models/players";
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '@/_services/authentication.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user: UserDetails;

  constructor(private http: HttpClient) { }

  
  
  Edit(user: Player) {
    return this.http.put('http://localhost:3000/api/player/${user.playerId}', user);
  }

  ngOnInit() {}
}
