import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  deleteProduct(id: number) {
    const url = `${this.BASE_URL}/`+id;

    const httpOptionsToken= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer " + this.storageService.getToken()
      })
    };

    return this.httpClient
    .delete<any>(url, httpOptionsToken)
    .pipe(catchError(this.handleError));
    
  }

  private BASE_URL = 'https://chaudecor.tk/api/users';

  private httpOptions= {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: "Bearer " + this.storageService.getToken()
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

  constructor(private httpClient : HttpClient,
              private storageService : TokenStorageService) { }

  public getListUsers():Observable<any> {
    const url = `${this.BASE_URL}`;
    return this.httpClient
    .get<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
  }


}
