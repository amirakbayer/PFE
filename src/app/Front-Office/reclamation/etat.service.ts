import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EtatService {
  baseUri: string = 'http://localhost:4000/etat';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  T  = [ 
    {id:1,Nom:"en attente",altNom:"en attente"},
    {id:2,Nom:"devis",altNom:"en cours de traitement"},
    {id:3,Nom:"contrats",altNom:"en cours de traitement"},
    {id:4,Nom:"ordres d'execution",altNom:"en cours de traitement"},
    {id:5,Nom:"factures",altNom:"en cours de traitement"},
    {id:6,Nom:"vérification",altNom:"en cours de traitement"},
    {id:7,Nom:"fin",altNom:"traitée"},
    {id:8,Nom:"invalide",altNom:"invalide"},
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

  getEtatDet(id:string): Observable<any>{
    let url = `${this.baseUri}/readEtat/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  etatName(id){
    
    for(let i=0;i<this.T.length;i++){
      if(this.T[i].id==id){
        return this.T[i].Nom;
      }
    }
    return "en attente";
  }
  etatAltName(id){
    
    for(let i=0;i<this.T.length;i++){
      if(this.T[i].id==id){
        return this.T[i].altNom;
      }
    }
    return "en attente";
  }
  etatNames(){
    return ["en attente","recherche des fournisseurs","mise en accord","execution","finalisation","traitée"]
  }
  
}
