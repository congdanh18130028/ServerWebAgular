import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

    
  private BASE_URL = 'https://chaudecor.tk/api/bills';
  // private BASE_URL = 'https://localhost:44323/api/products';

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

  constructor(private httpClient : HttpClient,
              private storageService : TokenStorageService) { }

  public getAllBills():Observable<any>{
    const url = `${this.BASE_URL}/all`;

    const httpOptionsToken= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer " + this.storageService.getToken()
      })
    };
    return this.httpClient
    .get<any>(url, httpOptionsToken)
    .pipe(catchError(this.handleError));

  }


  public changeState(id:number, state:number):Observable<any>{
    const url = `${this.BASE_URL}/state?billId=`+id+'&state='+state;

    const httpOptionsToken= {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        Authorization: "Bearer " + this.storageService.getToken()
      })
    };

    return this.httpClient
    .patch<any>(url, null, httpOptionsToken)
    .pipe(catchError(this.handleError));

  }

  public getAllBills0():Observable<any>{
    const url = `${this.BASE_URL}/state/0`;

    const httpOptionsToken= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer " + this.storageService.getToken()
      })
    };
    return this.httpClient
    .get<any>(url, httpOptionsToken)
    .pipe(catchError(this.handleError));

  }

  
}
