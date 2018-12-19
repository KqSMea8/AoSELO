import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { FactionswitchComponent } from './factionswitch/factionswitch.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { EditComponent } from "./_components/edit/edit.component";
import { CallbackComponent } from "./callback/callback.component";
import { GamesComponent } from './games/games.component';
import { AuthGuardService } from "@/_guards/auth.guard";
import { AdminGuard } from "@/_guards/admin.guard";
import { LogoutComponent } from './_components/logout.component';
import { ResetComponent } from './_components/reset/reset.component';



const routes: Routes = [
	{
		path: '',
		component: ChartComponent
	},
	{
		path: 'upload',
		canActivate: [AuthGuardService],
		component: UploadComponent
	},
	{
		path: 'profile',
		canActivate: [AuthGuardService],
		component: ProfileComponent
		
	},
	{
		path: 'register',
		component: RegisterComponent
		
	},
	{
		path: 'edit',
		canActivate: [AuthGuardService],
		component: EditComponent
		
	},
	{
		path: 'games',
		canActivate: [AuthGuardService, AdminGuard],
		component: GamesComponent
	},
	{
		path: 'reset/:resetToken',
		component: CallbackComponent
	},
	{
		path: 'password',
		component: CallbackComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'logout',
		component: LogoutComponent
	},
	{
		path: 'reset',
		component: ResetComponent
	}
	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }