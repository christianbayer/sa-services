import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { EventsListComponent } from "./events/list/list.component";
import { SubscriptionsListComponent } from "./subscriptions/list/list.component";
import { LogoutComponent } from "./auth/logout/logout.component";
import { CheckinSelectEventComponent } from "./checkin/select-event/select-event.component";
import { CheckinListComponent } from "./checkin/list/list.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'events', component: EventsListComponent},
  {path: 'subscriptions', component: SubscriptionsListComponent},
  {path: 'checkin', component: CheckinSelectEventComponent},
  {path: 'checkin/:id', component: CheckinListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
