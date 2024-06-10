import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { ProfileComponent } from "./agentApp/profile/profile.component";
import { AgentsListComponent } from "./components/agents-list/agents-list.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { HomeComponent } from "./components/home/home.component";
import {adminGuard} from "./users.guard";
import {HomeAgentComponent} from "./agentApp/home-agent/home-agent.component";
import {CreateClientComponent} from "./agentApp/create-client/create-client.component";
import {ListClientComponent} from "./agentApp/list-client/list-client.component";
import {LoginClientComponent} from "./ClientApp/loginClient/LoginClient.component";
import {ChangePasswordClientComponent} from "./ClientApp/change-password-client/change-password-client.component";
import {ProfileClientComponent} from "./ClientApp/profile-client/profile-client.component";
import {InterfaceClientComponent} from "./ClientApp/interface-client/interface-client.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard], children: [
      { path: 'home', component: HomeComponent },
      { path: 'agents', component: AgentsListComponent, canActivate: [adminGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, canActivate: [adminGuard] }
    ]
  },
  {
  path: 'agent', children: [
      { path: 'profile',component: ProfileComponent },
      { path: 'home',component: HomeAgentComponent },
      { path: 'clients',component: ListClientComponent },
      { path: 'createClient',component: CreateClientComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'change-password', component: ChangePasswordComponent },

    ]
},
  {
  path: 'client', children: [
  { path: 'profile',component: ProfileClientComponent },
  { path: 'home',component: InterfaceClientComponent },
  { path: 'changePasswordClient',component: ChangePasswordClientComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
]
},
  { path: 'loginClient', component: LoginClientComponent },
];
