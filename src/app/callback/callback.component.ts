import { Component, OnInit } from '@angular/core';
import { AuthService } from '@/_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  pwordForm: FormGroup;
  resetForm: FormGroup;
  submitted = false;
  resetToken: string;
  isLoggedIn = false;
  
  constructor(private auth: AuthService, private router: Router,
              private formBuilder: FormBuilder, private route: ActivatedRoute) {
    
  }


  ngOnInit() {
    this.pwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      cPassword: ['', Validators.required]
    });
    this.resetForm = this.formBuilder.group({
      password: ['', Validators.required],
      cPassword: ['', Validators.required]
    });
    this.resetToken = this.route.snapshot.paramMap.get('resetToken7');
    if (this.auth.currentUser) {this.isLoggedIn = true;}
  }

  get f() {return this.pwordForm.controls;}

  onSubmit() {
    this.submitted = true;
    
    if (this.pwordForm.invalid) {
      return;
    }
    
    if (this.f.password.value === this.f.cPassword.value) {
    this.auth.passwordReset(this.resetToken, this.f.password.value)
    .subscribe(result => {
        this.router.navigateByUrl('/profile');
        console.log("Reset is successful ", result);  
      },
      error => {
          console.log("Error", error);
      });
    }
  }

  get c() {return this.resetForm.controls;}

  reset() {
    this.submitted=true;
    if (this.resetForm.invalid) {
      return;
    }
    this.auth.passwordChange(this.c.password.value);
    this.router.navigateByUrl('/profile');
    console.log("Reset successful");
  }

}
