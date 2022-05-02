import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { reclam } from './reclam';


@Injectable()
export class RecServiceService {
  baseUri: string = 'http://localhost:4000/rec';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
   R0= new reclam("","","",0,"",0,0);
   T: Array<reclam> = [
    new reclam("1","01","1",1,"12/04/2022",15,1,"abcd",""),
    new reclam("2","01","1",2,"12/04/2022",23,3,"abcd","02"),
    new reclam("3","02","2",4,"15/01/2022",42,2,"abcd","02"),
    new reclam("4","03","3",7,"16/02/2021",36,1,"abcd","02")
]
  constructor(
    private http: HttpClient
    ) {
    
   }
   reclams: any=[];
   reclamsOfUser: any=[];
   affectedRecs: any=[];
   

   

   postRec(data): Observable<any>{
    let url = `${this.baseUri}/createRec`;
     return this.http.post(url, data).pipe(catchError(this.errorMgmt));
   }

    getRecDet(id:string): Observable<any>{
      let url = `${this.baseUri}/readRec/${id}`;
      return this.http.get(url, { headers: this.headers }).pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
   }
   getReclamsOfUser(id ){
    let url = `${this.baseUri}/readOwnRecs/${id}`; 
    console.log('front ',this.http.get(url))
    return  this.http.get(url);
  }
  getAffRecs(id ){
    let url = `${this.baseUri}/readAffRecs/${id}`; 
    console.log('front ',this.http.get(url))
    return  this.http.get(url);
  }
   IdExists(ident:string){
    const found = this.T.find(element => element.id == ident);
    if (typeof found == undefined){
      return false;
    } else {
      return true;
    }
   }
  // Delete employee
  deleteRec(id): Observable<any> {
    let url = `${this.baseUri}/deleteRec/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

   // Update employee
   updateRec(id, data): Observable<any> {
    let url = `${this.baseUri}/updateRec/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
   
   getRec(){
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
