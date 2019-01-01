import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@/_services/authentication.service';
import { Player } from '@/_models/players';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  
  model = new Player();
  submitted = false; 
  
  constructor(private auth: AuthService, private router: Router) {}
  
    ngOnInit() {}
  
    register(model: Player) {
      this.auth.register(
        this.model.email, 
        this.model.username, 
        this.model.password
      ).subscribe(error =>
        console.log(error));
        if (!Error) { this.router.navigateByUrl('/profile');}
    }
  }