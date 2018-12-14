import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { GamesComponent } from './games/games.component';
import { AuthService } from './_services/authentication.service';
import { AdminGuard } from "@/_guards/admin.guard";
import { UtilityService } from "@/_services/utils.service";
import { FilterSortService } from './_services/filter-sort.service';
import { CallbackComponent } from './callback/callback.component';
import { LoadingComponent } from '@/_components/loading.component';
import { AuthGuardService } from '@/_guards/auth.guard';
import { LogoutComponent } from './_components/logout.component';
import { FrameAuth } from './_services/frameauth.servce';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ResetComponent } from './_components/reset/reset.component';


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
    GamesComponent,
    CallbackComponent,
    LoadingComponent,
    LogoutComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	  HttpClientModule,
    CdkTableModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule
	],
  providers: [
    Games,
    Rank,
    UtilityService,
    Title,
    AuthService,
    FilterSortService,
    AuthGuardService,
    AdminGuard,
    FrameAuth,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
