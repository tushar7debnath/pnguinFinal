import { Injectable } from '@angular/core';
import {AngularFire} from 'angularfire2';

@Injectable()
export class AuthService {

    private uid: string;
    private userName: string;

    constructor(public af: AngularFire) {

         this.af.auth.subscribe(auth => {this.uid = auth.uid; this.userName = auth.google.displayName; } );

    }

    getUID(): string { return this.uid; }

    getUserName(): string { return this.userName; }

    login() {this.af.auth.login().then(function(){ location.reload(); } ); }

    logout() {this.af.auth.logout(); location.reload();

  }

}

