import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ThemeComponent } from "./theme/theme.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./auth/register/register.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatTableModule } from "@angular/material/table";
import { EventsListComponent } from "./events/list/list.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { SubscriptionsListComponent } from "./subscriptions/list/list.component";
import { EventsService } from "./events/events.service";
import { HttpClientModule } from "@angular/common/http";
import { MatSortModule } from "@angular/material/sort";
import { AuthService } from "./auth/auth.service";
import { DatePipe } from "@angular/common";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { LogoutComponent } from "./auth/logout/logout.component";
import { EventsConfirmSubscriptionComponent } from "./events/confirm-subscription/confirm-subscription.component";
import { MatDialogModule } from "@angular/material/dialog";
import { SubscriptionsService } from "./subscriptions/subscriptions.service";
import { SubscriptionsConfirmUnsubscriptionComponent } from "./subscriptions/confirm-unsubscription/confirm-unsubscription.component";
import { CheckinSelectEventComponent } from "./checkin/select-event/select-event.component";
import { CheckinListComponent } from "./checkin/list/list.component";
import { CheckinService } from "./checkin/checkin.service";
import { CheckinConfirmComponent } from "./checkin/confirm/confirm.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CheckinUpdateComponent } from "./checkin/update/update.component";
import { CheckinAddComponent } from "./checkin/add/add.component";

@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    EventsListComponent,
    EventsConfirmSubscriptionComponent,
    SubscriptionsListComponent,
    SubscriptionsConfirmUnsubscriptionComponent,
    CheckinSelectEventComponent,
    CheckinListComponent,
    CheckinConfirmComponent,
    CheckinUpdateComponent,
    CheckinAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSlideToggleModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    MatDatepickerModule,
    DatePipe,
    AuthService,
    EventsService,
    SubscriptionsService,
    CheckinService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
