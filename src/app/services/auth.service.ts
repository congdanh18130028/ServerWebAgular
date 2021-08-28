import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'https://chaudecor.tk/api/login';
  // private BASE_URL = 'https://localhost:44323/api/login';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


  constructor(private httpClient : HttpClient) { }


  public login(username : string, password : string): Observable<any> {
    const url = `${this.BASE_URL}?email=`+username+'&'+'password='+password;
 
    return this.httpClient
    .post<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
    
  }



}
