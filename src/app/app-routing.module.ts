import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { FactionswitchComponent } from './factionswitch/factionswitch.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { OktaService } from './_services/okta.service';
import { EditComponent } from "./_components/edit/edit.component";
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { OktaCallbackComponent, OktaAuthGuard } from "@okta/okta-angular";
import { GamesComponent } from './games/games.component';



const routes: Routes = [
	{
		path: '',
		component: ChartComponent
	},
	{
		path: 'upload',
		component: UploadComponent,
		canActivate: [OktaAuthGuard]
	},
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [OktaAuthGuard]
		
	},
	{
		path: 'register',
		component: RegisterComponent
		
	},
	{
		path: 'edit',
		component: EditComponent,
		canActivate: [OktaAuthGuard]
	},
	{

		path: 'implicit/callback',	
		component: OktaCallbackComponent
	
	},
	{
		path: 'games',
		component: GamesComponent
	}
	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }