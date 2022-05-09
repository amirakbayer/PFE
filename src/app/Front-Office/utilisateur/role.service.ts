import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseUri: string = 'http://localhost:4000/role';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  T  = [ 
    {id:"1",Nom:"employé"},
    {id:"2",Nom:"assistant"},
    {id:"3",Nom:"responsable"},
  ]
  constructor(private http: HttpClient) { }
  roleName(id){
    
    for(let i=0;i<this.T.length;i++){
      if(this.T[i].id==id){
        return this.T[i].Nom;
      }
    }
    return "employé";
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

  getRoleDet(id:string): Observable<any>{
    let url = `${this.baseUri}/readRole/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  
}
