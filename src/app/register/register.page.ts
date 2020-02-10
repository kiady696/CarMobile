import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

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
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'forname': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password2': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'birthday': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'tel': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'ville': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
  };


  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  tryRegister(value){
    console.log(value);
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
      name: 'sexe_list',
      value: 'M',
      text: 'M',
      disabled: false,
      checked: false,
      color: 'primary'
    }, {
      id: '2',
      name: 'sexe_list',
      value: 'F',
      text: 'F',
      disabled: false,
      checked: false,
      color: 'secondary'
    }
  ];
 
  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail);
    this.selectedRadioGroup = event.detail;
  }
 
  radioFocus() {
    console.log("radioFocus");
  }
  radioSelect(event) {
    console.log("radioSelect",event.detail);
    this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    console.log("radioBlur");
  }

}
