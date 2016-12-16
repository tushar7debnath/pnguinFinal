import { Component, OnInit } from '@angular/core';
import { AuthService } from '../firebase-auth.service';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private auth: AuthService, private http: Http ) {


  }
login() {
   this.auth.login();


  }

  logout() {
    this.auth.logout();
    



  }
  ngOnInit() {
  }

}
