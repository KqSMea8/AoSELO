import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AuthService } from '@/_services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetForm: FormGroup;
  submitted = false;

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private http: HttpClient) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    //this.http.post("http://localhost:3000/api/reset", {"email": this.f.email.value})
    this.auth.doPasswordLost(this.f.email.value)
    .subscribe(
      user => {
        console.log("Request is successful ", user);
        this.submitted=false;   
      },
      err => {
          console.log("Error", err);
          this.submitted=false;
      });
  }

}
