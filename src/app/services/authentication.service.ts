import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import {HttpService} from '../services/http.service';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private platform: Platform,
    public toastController: ToastController,
    public httpService: HttpService , 

    private storage: Storage

  ) {
      this.platform.ready().then( () => {
        this.storage.set('token' , "ABBA");
        this.ifLoggedIn();
      });
   }

    getToken(idUser){  
      let personneId = this.storage.get('idPersonne')
      this.httpService.callService('Utilisateur/token/id/'+personneId).subscribe((data) => {
        console.log(data);
        var token = data;
      });
      // IF token MI-EXISTE LOCAL ARY MITOVY @'NY TOKEN ANY AMIN'NY BASE SERVEUR -> return tru
     return true;
    }

    ifLoggedIn(){
      this.storage.ready().then(
        () => { 
          //onfullfilled ny ato 
          this.storage.get('token').then( (val) => {// TSY MAMOAKA ERREUR ITO FA MAMOAKA EXCEPTION TYPEERROR MILA CATCHENA raha tsy mbola misy 'key' value 'token' value 
              //onfullfilled ny ato
              // TESTS FOTSINY LOA
              /* if(this.checkToken(localToken)){ //raha mitovy @ any amin'ilay base de donnée ilay token local

              } */

              //this.authState.next(false);
              console.log('le token local est: '+val);
              var tokenVrai = 'kiady';
              if(val != tokenVrai){
                this.authState.next(false);


              }else{
                this.authState.next(true);
              }
              

            
          }, function error(localToken){
            console.log('erreur getting local token in sqlite storage');

          }).catch(
            // Promesse rejetée
            function() { 
              console.log("getting local token throwed an Exception ");
            });
            

          //  if(this.checkToken(token)){

          // }  
        }
      ).catch(
        // Promesse rejetée
        function() { 
          console.log("Storage not ready (Promise in local storage readyness)");
        });

  }




    login(response:any){
      //VARIABLE POUR STOCKER LE TOKEN ET L'EXPIRATION
      if(response.data.status){
        var token = response.data.email;
        console.log(token);
        //GENERER L'EXPIRATION DU TOKEN DANS STORAGE
        //PASSER LE TOKEN dans ts les pages tant qu'il n'est pas expiré
          //Sauvegarder token et tokenExpiration dans stockage
          //Creer fonction qui verifie que le token n'est pas encore expiré

        this.router.navigate(['list']);
      }else{
        console.log("Tsy namerina ninina ilay check anaty login ws oo");
      }
    }



}
