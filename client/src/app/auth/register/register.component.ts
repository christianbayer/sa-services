import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { DatePipe } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(private _authService: AuthService, private _datePipe: DatePipe, private _snackBar: MatSnackBar, private _router: Router) {
    this.formGroup = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'birthdate': new FormControl(null, [Validators.required]),
      'identity': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void { }

  public onSubmit($event: any) {
    if(this.formGroup.invalid) {
      return false;
    }
    const value = this.formGroup.value;
    value.birthdate = this._datePipe.transform(value.birthdate, 'yyyy-MM-dd');
    this._authService.register(value).subscribe((response: any) => {
      this._snackBar.open("User created!", '', {duration: 2000});
      this._router.navigate(['/login']);
    }, (error => {
      this._snackBar.open(error.error.error, '', {duration: 2000});
    }));
  }

}
