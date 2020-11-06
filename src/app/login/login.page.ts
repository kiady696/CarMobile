import { Component, OnInit } from '@angular/core';
import {HttpService} from '../services/http.service';
import {AuthenticationService} from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
    console.log('niditra page login');
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  loginUser(value){
    console.log(value.email+' & '+value.password);
      //RECUPERATION DONNEES DE LOGIN
      var postData = { //raw json
        "email": value.email,
        "pwd":value.password
      }
      try{
        //MIANTSO NY PERSONNE/LOGIN AMZAY ETO
        this.httpService.callPostService(postData,'Utilisateur/login').subscribe((data) => {
        console.log('eto ambany eto le nalefa tany am webservice');
        console.log(data);
        this.errorMessage = data.message;
        if(data.data!=null){  //RAHA TSISY ERREUR (AUTHENTIFICATION REUSSIE)
          this.authService.login(data);
        }else{
          //Mamerina manao login le olona
        }
        
        })
      }catch(Error){
        this.errorMessage = Error.message;
      }
  }

}
