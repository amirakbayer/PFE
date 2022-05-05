import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FournisseursService {
  baseUri: string = 'http://localhost:4000/fournisseur';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
  postFour(data): Observable<any>{
    let url = `${this.baseUri}/createFour`;
     return this.http.post(url, data).pipe(catchError(this.errorMgmt));
   }
   getFourDet(id:string): Observable<any>{
    let url = `${this.baseUri}/readFour/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
 }
 deleteFour(id): Observable<any> {
  let url = `${this.baseUri}/deleteFour/${id}`;
  return this.http
    .delete(url, { headers: this.headers })
    .pipe(catchError(this.errorMgmt));
}
updateFour(id, data): Observable<any> {
  let url = `${this.baseUri}/updateFour/${id}`;
  return this.http
    .put(url, data, { headers: this.headers })
    .pipe(catchError(this.errorMgmt));
}
getFour(){
  return this.http.get(`${this.baseUri}`);
 }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }  
}
