import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LieuService {
  baseUri: string = 'http://localhost:4000/lieu';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  T  = [ 
    {id:"1",gouv:"Tunis",ville:"Tunis",agence:"Tunis"},
    {id:"2",gouv:"Ariana",ville:"Ariana",agence:"Ariana"},
    {id:"3",gouv:"Ben Arous",ville:"Ben Arous",agence:"Ben Arous"},
  ]
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

  getLieuDet(id:string): Observable<any>{
    let url = `${this.baseUri}/readLieu/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  getGouv(id){
    
    for(let i=0;i<this.T.length;i++){
      if(this.T[i].id==id){
        return this.T[i].gouv;
      }
    }
    return "Tunis";

  }

  getVil(id){
    
    for(let i=0;i<this.T.length;i++){
      if(this.T[i].id==id){
        return this.T[i].ville;
      }
    }
    return "Tunis";
    
  }

  getAg(id){
    
    for(let i=0;i<this.T.length;i++){
      if(this.T[i].id==id){
        return this.T[i].agence;
      }
    }
    return "Tunis";
    
  }

}
