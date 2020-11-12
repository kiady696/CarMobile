import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  base_path = 'http://localhost/WS_Cotisse/';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  // GET 
  callService(link: string){
      return this.http.get(`http://localhost/WS_Cotisse/${link}`);
  }

  // POST
  callPostService(params:any,link:string){
    
    const url= `http://localhost/WS_Cotisse/${link}`;
     
    return this.http.post<any>(url,JSON.stringify(params), this.httpOptions);
  }
  
}
