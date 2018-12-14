import { Component, OnInit } from '@angular/core';
import { AuthService } from '@/_services/authentication.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  isAuthenticated: boolean;

  constructor(public auth: AuthService) {}

  ngOnInit() {}

  

}
