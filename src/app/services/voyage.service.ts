import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from '../services/http.service';
/* import { Storage } from '@ionic/storage';
 */

 

@Injectable({
  providedIn: 'root'
})
export class VoyageService {

  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }
  
  getDetail(){

  }

  searchData(){
    
  }




}
