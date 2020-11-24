import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SessionService } from "../../core/services/session.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(private _authService: AuthService, private _sessionService: SessionService, private _snackBar: MatSnackBar, private _router: Router) {
    this.formGroup = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void { }

  public onSubmit($event: any) {
    if(this.formGroup.invalid) {
      return false;
    }
    this._authService.login(this.formGroup.value).subscribe((response: any) => {
      this._sessionService.setToken(response);
      this._router.navigate(['/events']);
    }, (error => {
      this._snackBar.open(error.error.error, '', {duration: 2000});
    }));
  }

}
