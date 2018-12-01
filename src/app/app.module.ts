import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { ChartComponent } from './chart/chart.component';
import { ChartrowsComponent } from './chartrows/chartrows.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FactionswitchComponent } from './factionswitch/factionswitch.component';
import { ListswitchComponent } from './listswitch/listswitch.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadComponent } from './upload/upload.component';
import { CdkTableModule } from '@angular/cdk/table';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Rank } from './_services/rank.service';
import { Games } from './_services/games.service';
import { AppMaterialModule } from './_helpers/material-import';
import { EditComponent } from './_components/edit/edit.component';
import { OktaAuthModule } from '@okta/okta-angular';
import { OktaService } from './_services/okta.service';
import { GamesComponent } from './games/games.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    ChartComponent,
    FactionswitchComponent,
    ListswitchComponent,
    LoginComponent,
    RegisterComponent,
	  ProfileComponent,
	  UploadComponent,
    FooterComponent,
    ChartrowsComponent,
    EditComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	  HttpClientModule,
    CdkTableModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule,
    OktaAuthModule.initAuth({
      issuer: 'https://dev-498610.oktapreview.com/oauth2/default',
      redirectUri: 'http://192.168.1.3:4200/implicit/callback',
      clientId: '0oahxvp75nDkrk3b00h7'
    })
	],
  providers: [
    Games,
    Rank,
    OktaService,
    Title
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
