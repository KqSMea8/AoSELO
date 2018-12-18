import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatFormField } from '@angular/material'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Player } from '@/_models/players';
import { AuthService } from '@/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    
  User: Player;
  loginForm: FormGroup;
  returnUrl: string;
  loading = false;
  submitted = false;
  
  constructor(public auth: AuthService, public router: Router,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.auth.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to from fields
  get f() {return this.loginForm.controls;}

  pageLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading= true;
    this.auth.login(this.f.email.value, this.f.password.value)
    .subscribe(
      login => {
        this.router.navigateByUrl('/profile');
        console.log("PUT Request is successful ", login);
        this.loading=false;   
      },
      error => {
          console.log("Error", error);
          this.loading=false;
      });    
  }
    
}