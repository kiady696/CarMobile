import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private platform: Platform,
    public toastController: ToastController,
  ) {
    this.platform.ready().then( () => {
      /*ty ifLoggedIn() ty miverifier anle token anle olona oe efa misy
      any am base ve | Tsy mbola lany date ve
      */
      
      this.ifLoggedIn();
    });
   }

   ifLoggedIn(){
    // 1 - miantso service mverifier token any am base | WEBSERVICE
    // 2 - Mamerina Promise resultatToken eto
    /* 3 - resultatToken.then((response) => {
              if(response){
                this.authState.next(true);
                this.router.navigate(['home']);
              }
           } )*/

    this.authState.next(false);
    
          
   }

}
