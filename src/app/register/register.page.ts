import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {HttpService} from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password1': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Enter a valid name.' }
    ],
    'forname': [
      { type: 'required', message: 'Forname is required.' },
      { type: 'pattern', message: 'Enter a valid forname.' }
    ],
    'password2': [
      { type: 'required', message: 'Confirmation is required.' },
      { type: 'pattern', message: 'Enter a valid password.' }
    ],
    'birthday': [
      { type: 'required', message: 'Birthday is required.' },
      { type: 'pattern', message: 'Enter a valid Birthday.' }
    ],
    'tel': [
      { type: 'required', message: 'Number is required.' },
      { type: 'pattern', message: 'Enter a valid number.' }
    ],
    'ville': [
      { type: 'required', message: 'Hometown is required.' },
      { type: 'pattern', message: 'Enter a valid hometown.' }
    ],
    'sexe' : [
      { type: 'required', message: 'Hometown is required.' },
      { type: 'pattern', message: 'Enter a valid hometown.' }
    ]
  };


  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router:Router
  ) { }

  tryRegister(value){
    console.log(value);
    //mregrouper anle data
      let data={
        "email": value.email,
        "nom":value.name,
        "prenom": value.forname,
        "dateNaissanceInserer":value.birthday,
        "sexe": value.sexe,
        "ville": value.ville,
        "tel" : value.tel,
        "mdp" : value.password1,
        "confirmMdp": value.password2       
      }
      //mandefa anle information anle client
      this.httpService.callPostService(data,'Personne/Inscription').subscribe((res) => {
        this.errorMessage=res.message;
        if(res.data!=null){
          console.log('inscription reussi , vos donnees envoyées:');
          console.log(data);
          this.successMessage = res.message;
          this.router.navigate(['login']);
        }else{
          console.log('La reponse :');
          console.log(res);
        } 
      })
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password1: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      //ETO NY CONTROLE AN'NY CHAMPS HAFA REHETRA AMBINY 
      name: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      forname : new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      birthday : new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      ville : new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      tel : new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      password2 : new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      sexe : new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))

    });
  }

  defaultSelectedRadio = "M";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;
 
  radio_list = [
    {
      id: '1',
      name: 'sexe',
      value: 'H',
      text: 'M',
      disabled: false,
      
      color: 'secondary'
    }, {
      id: '2',
      name: 'sexe',
      value: 'F',
      text: 'F',
      disabled: false,
      
      color: 'secondary'
    }
  ];
 
  
}
