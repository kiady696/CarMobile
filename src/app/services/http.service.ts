import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  callService(link: string){
      return this.httpClient.get(`http://localhost:5000/${link}`);
  }
  callPostService(params:any,link:string){
    const headers = new HttpHeaders();
    headers.set("Acces-Allow-Control-Origin","*");
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options={headers:headers,withCredintials: false}

    const url= `http://localhost:5000/${link}`;
    return this.httpClient.post<any>(url,params,options);
  }
}
