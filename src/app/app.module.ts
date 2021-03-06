import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { NgSemanticModule } from 'ng-semantic';
import { TruncatePipe } from 'angular2-truncate';



import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {AuthService } from './firebase-auth.service';
import {ProjectService } from './firebase-project.service';
import {StorageService } from './firebase-storage.service';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListingComponent } from './listing/listing.component';
import { NavComponent } from './nav/nav.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';




export const firebaseConfig = {
  apiKey: 'AIzaSyDQfOuLo9dSIGFLgQ4G0YxRZPZaLqWy1Kw',
  authDomain: 'teambase-c702d.firebaseapp.com',
  databaseURL: 'https://teambase-c702d.firebaseio.com',
  storageBucket: 'teambase-c702d.appspot.com'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    AppComponent,
    TruncatePipe,
    LoginComponent,
    ListingComponent,
    NavComponent,
    DetailComponent,
    CreateComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgSemanticModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    RouterModule.forRoot([
       { path: '', component: LoginComponent },
       { path: 'listing', component: ListingComponent },
       { path: 'detail', component: DetailComponent },
       { path: 'create', component: CreateComponent }

    ])
  ],
  providers: [AuthService, ProjectService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
