import { Component, OnInit } from '@angular/core';
import {HttpService} from '../services/http.service';
import {AuthenticationService} from '../services/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  postData: any

  constructor(
    private authService: AuthenticationService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.postData = {};
    console.log('niditra page login');
  }

  loginUser(){
    console.log(this.postData);
      //RECUPERATION DONNEES DE LOGIN
      let postData = {
        "email": this.postData.email,
        "mdp":this.postData.password
      }
      //MIANTSO NY PERSONNE/LOGIN AMZAY ETO
    this.httpService.callPostService(postData,'Personne/Login').subscribe((data) => {
      console.log('eto ambany eto le nalefa tany am webservice');
      console.log(data);
      //MAKA TOKEN??
      this.authService.login(data);
    })
  }

}
