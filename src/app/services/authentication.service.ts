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

    //TEST
    this.storage.set('idUser', 'U1');
    this.storage.set('token', 'KKKKKKKKKKKycvgubi666');


    this.ifLoggedIn();
    });
  }

    //NY FONCTION IDIRANA FAHATELO
    checkToken(tokenBase){
      // MI-VERIFIER TOKEN HOE MITOVY VE 
      console.log(tokenBase.data.token);
      console.log(tokenBase.data.expirationtoken);
      var dateTokenBase = new Date(tokenBase.data.expirationtoken);
      var isVrai = true;
      this.storage.get('token').then( 
        (token) => {
          console.log('le token stocké etait: '+token);
          if(token == '' || token == null){
            isVrai = false;
          }else{
            /* else if(token !== tokenBase.data.token){
            isVrai = false;
          } *//* else if(new Date().getTime() > dateTokenBase.getTime()){
            isVrai = false;
          } */
            isVrai = true;
          }
        }
      )
      return isVrai;
    } 

    //NY FONCTION IDIRANA VOALOHANY INDRINDRA  : MISY CALLBACK HELL BEEEE TSSSS
    ifLoggedIn(){
      
          //MI-VERIFIER idUser RAHA EFA MISY VE 
          this.storage.get('idUser').then(
            (id) => {
              console.log('L\'id stocké était : '+ id);
              if(id == '' || id == null){
                this.authState.next(false);
                return;
              }else{ // raha efa nisy idUser tao de verifiena ndray ny token 
                this.httpService.callService('Utilisateur/token/id/'+id).subscribe((data) => {
                  console.log(data);
                  if(this.checkToken(data)){ // raha ni-existe , nitovy t@ tokenBase sy tsy mbola lany date ilay token local tao
                    this.authState.next(true);
                  }else{
                    this.authState.next(false);
                  }   
                });
                
              }
            } , function error (id){
              console.log('L\'id stocké était : '+ id);
            }
          ).catch((reason) => {
            console.log(reason);
          })
        

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
