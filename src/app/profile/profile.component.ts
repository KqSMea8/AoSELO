import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OktaService } from '@/_services/okta.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

@NgModule({
  imports: [
    FormsModule,
    OktaService
  ]
})
export class ProfileComponent implements OnInit {

  constructor(private oktaAuth: OktaService) {}
 
  onClick() {
    this.oktaAuth.logout();
  }
  
  ngOnInit() {}
}
