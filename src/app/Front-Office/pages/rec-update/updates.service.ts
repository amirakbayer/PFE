import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdatesService {
  baseUri: string = 'http://localhost:4000/mise_a_jour';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

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

  getRecUpdates(id ){
    let url = `${this.baseUri}/readUpdate/${id}`; 
    return  this.http.get(url);
  }

  saveUpdate(data): Observable<any>{
    let url = `${this.baseUri}/saveUpdate`;
     return this.http.post(url, data).pipe(catchError(this.errorMgmt));
   }


}
