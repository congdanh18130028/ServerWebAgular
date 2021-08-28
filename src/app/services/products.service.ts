import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { FormGroup } from '@angular/forms';


export interface ProductEdit {
  value: string;
  path: string;
  op: string;
}


@Injectable({
  providedIn: 'root'
})




export class ProductsService {
  
  
  private BASE_URL = 'https://chaudecor.tk/api/products';
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

  private product: any;

  setProduct(product : any){
    this.product = product;
  }
  
  getProduct(){
    let temp = this.product;
    this.clearProduct();
    return temp;
  }
  
  clearProduct(){
    this.product = undefined;
  }

  constructor(private httpClient : HttpClient,
              private storageService : TokenStorageService) { }

  public getListProducts():Observable<any> {
    const url = `${this.BASE_URL}`;
    return this.httpClient
    .get<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getProductFromServer(id : number):Observable<any>{
    const url = `${this.BASE_URL}/`+id;
    return this.httpClient
    .get<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public editName(id : number, name: string):Observable<any>{
    const url = `${this.BASE_URL}/`+id;

    const httpOptionsToken= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer " + this.storageService.getToken()
      })
    };

    let edit : ProductEdit ={
      value:  name,
      path: '/name',
      op: 'replace'
    };
    let result: ProductEdit[] =[edit]
    const body=JSON.stringify(result);
    return this.httpClient
    .patch<any>(url, body, httpOptionsToken)
    .pipe(catchError(this.handleError));
  }

  public editDescription(id : number, description: string):Observable<any>{
    const url = `${this.BASE_URL}/`+id;

    const httpOptionsToken= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer " + this.storageService.getToken()
      })
    };

    let edit : ProductEdit ={
      value:  description,
      path: '/description',
      op: 'replace'
    };
    let result: ProductEdit[] =[edit]
    const body=JSON.stringify(result);
    return this.httpClient
    .patch<any>(url, body, httpOptionsToken)
    .pipe(catchError(this.handleError));
  }

  public editQuantity(id: number, quantity: string) {
    const url = `${this.BASE_URL}/`+id;

    const httpOptionsToken= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer " + this.storageService.getToken()
      })
    };

    let edit : ProductEdit ={
      value:  quantity,
      path: '/quantity',
      op: 'replace'
    };
    
    let result: ProductEdit[] =[edit]
    const body=JSON.stringify(result);
    return this.httpClient
    .patch<any>(url, body, httpOptionsToken)
    .pipe(catchError(this.handleError));
  }

  public editPrice(id: number, price: string) {
    const url = `${this.BASE_URL}/`+id;

    const httpOptionsToken= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer " + this.storageService.getToken()
      })
    };

    let edit : ProductEdit ={
      value:  price,
      path: '/price',
      op: 'replace'
    };
    
    let result: ProductEdit[] =[edit]
    const body=JSON.stringify(result);
    return this.httpClient
    .patch<any>(url, body, httpOptionsToken)
    .pipe(catchError(this.handleError));
  }

  public editCategory(id : number, category: string):Observable<any>{
    const url = `${this.BASE_URL}/`+id;

    const httpOptionsToken= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer " + this.storageService.getToken()
      })
    };

    let edit : ProductEdit ={
      value:  category,
      path: '/category',
      op: 'replace'
    };

    let result: ProductEdit[] =[edit]
    const body=JSON.stringify(result);
    return this.httpClient
    .patch<any>(url, body, httpOptionsToken)
    .pipe(catchError(this.handleError));
  }

    

  public getListCategory():Observable<any> {
    const url = `${this.BASE_URL}/categories`;
    return this.httpClient
    .get<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public addCategory(categoryName : string):Observable<any>{
    const url = `${this.BASE_URL}/category?categoryName=`+categoryName;

    const httpOptionsToken= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer " + this.storageService.getToken()
      })
    };

    return this.httpClient
    .post<any>(url, null, httpOptionsToken)
    .pipe(catchError(this.handleError));
  }

  public addProduct(name : string, category : string, filePath : File, quantity : string, price : string, description : string):Observable<any>{
    const url =  `${this.BASE_URL}`;

    const httpOptionsToken= {
      headers: new HttpHeaders({
    

        Authorization: "Bearer " + this.storageService.getToken(),

      })
    };

    let formData: FormData = new FormData(); 
    formData.append('name', name);
    formData.append('category', category);
    formData.append('file', filePath);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('description', description);

    return this.httpClient
    .post<any>(url, formData, httpOptionsToken)
    .pipe(catchError(this.handleError));
  }


  
  public addImg(filePath : File):Observable<any>{
    const url =  `${this.BASE_URL}/img`;

    const httpOptionsToken= {
      headers: new HttpHeaders({

        Authorization: "Bearer " + this.storageService.getToken(),

      })
    };

    let formData: FormData = new FormData(); 
    formData.append('file', filePath);

    return this.httpClient
    .post<any>(url, formData, httpOptionsToken)
    .pipe(catchError(this.handleError));
  }

  public editImg(id : number, link : string):Observable<any>{
    const url =  `${this.BASE_URL}/img/`+id;

    const httpOptionsToken= {
      headers: new HttpHeaders({

        Authorization: "Bearer " + this.storageService.getToken(),

      })
    };

    let formData: FormData = new FormData(); 
    formData.append('link', link);

    return this.httpClient
    .patch<any>(url, formData, httpOptionsToken)
    .pipe(catchError(this.handleError));
  }

  public deleteProduct(id : number): Observable<any>{
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

}
