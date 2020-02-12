import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import {HttpService} from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private platform: Platform,
    public toastController: ToastController,
    public httpService: HttpService
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

   login(response:any){
     //VARIABLE POUR STOCKER LE TOKEN ET L'EXPIRATION
     if(response.data!=null){
        var token = response.data.token;
        //GENERER L'EXPIRATION DU TOKEN DANS STORAGE
        //PASSER LE TOKEN dans ts les pages tant qu'il n'est pas expiré
          //Sauvegarder token et tokenExpiration dans stockage
          //Creer fonction qui verifie que le token n'est pas encore expiré

        this.router.navigate(['list']);
     }else{
      console.log(response.data.token);
     }
     
     

     
   }

}
