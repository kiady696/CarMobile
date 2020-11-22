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

  ){
    this.platform.ready().then( () => {
    //Check idUSer then token , else , log in
    this.ifLoggedIn();
    });
  }

    checkToken(tokenBase){
      // MI-VERIFIER TOKEN HOE MITOVY VE 
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

      return false;
      

    
      }, function error(localToken){
        console.log('erreur getting local token in sqlite storage');
        

      }).catch(
        // Promesse rejetée
        function() { 
          console.log("getting local token throwed an Exception ");
        });
        

        //  if(this.checkToken(token)){

        // }  
        return false;

    }

    getToken(idUser){  
      let token = null;
      this.httpService.callService('Utilisateur/token/id/'+idUser).subscribe((data) => {
      console.log(data);
      token = data;
      });
    return token;
    }

    ifLoggedIn(){
      this.storage.ready().then(
        () => { 
          //onfullfilled ny ato 

          //MI-VERIFIER idUser RAHA EFA MISY VE 
          this.storage.get('idUser').then(
            (id) => {
              console.log('L\'id stocké était : '+ id);
              if(id == '' || id == null){
                this.authState.next(false);
                return;
              }else{ // raha efa nisy idUser tao de verifiena ndray ny token 
                let tokenBase = this.getToken(id);
                console.log(tokenBase.tokenString);
                if(this.checkToken(tokenBase)){ // raha ni-existe , nitovy t@ tokenBase sy tsy mbola lany date ilay token local tao
                  this.authState.next(true);
                }else{
                  this.authState.next(false);
                }   
              }
            } , function error (id){
              console.log('L\'id stocké était : '+ id);
            }
          )
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
