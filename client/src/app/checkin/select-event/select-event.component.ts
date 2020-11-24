import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-checkin-select-event',
  templateUrl: './select-event.component.html',
  styleUrls: ['./select-event.component.scss']
})
export class CheckinSelectEventComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(private _router: Router) {
    this.formGroup = new FormGroup({
      'event_id': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void { }

  public onSubmit($event: any) {
    if(this.formGroup.invalid) {
      return false;
    }
    this._router.navigate(['/checkin', this.formGroup.value.event_id]);
  }

}
