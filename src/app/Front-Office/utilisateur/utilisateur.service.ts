import { IfStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { LieuService } from './lieu.service';
//import { resolveCname } from 'dns';
import { RoleService } from './role.service';
import { utilisateur } from './utilisateur';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  baseUri: string = 'http://localhost:4000/utilisateur';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  T: Array<utilisateur> = [
    new utilisateur("01","1234","jdbdi","abc","def",123456,"bcbj@hj.com","1","1"),
    new utilisateur("02","5678","jdbdi","abc","def",123456,"bcbj@hj.com","2","2"),
    new utilisateur("03","9090","jdbdi","abc","def",123456,"bcbj@hj.com","3","3"),
];
  user=this.T[1];    
  constructor( private http: HttpClient,
    private role:RoleService,
     private lieu:LieuService) { }

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


    getUserDetAtAuth(matr,mdp): Observable<any>{
      let url = `${this.baseUri}/readUser/${matr}/${mdp}`;
      return this.http.get(url, { headers: this.headers }).pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
    }

    getUserDet(id): Observable<any>{
      let url = `${this.baseUri}/readUser/${id}`;
      return this.http.get(url, { headers: this.headers }).pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
    }
    getAssistants(id ){
      let url = `${this.baseUri}/readAss/${id}`;
      return  this.http.get(url);
    }

    updateUser(id, data): Observable<any> {
      let url = `${this.baseUri}/updateUser/${id}`;
      return this.http
        .put(url, data, { headers: this.headers })
        .pipe(catchError(this.errorMgmt));
    }


  UserExists(mat:string,mdp:string){
    
    for(let i=0;i<this.T.length;i++){
      
      var m1=this.T[i].Matr;
      var m2=this.T[i].Mdp;
      
      if(m1==mat && m2==mdp){
        return true;
      }
    }
    return false;
  }
  getUserRole(mat:string){
    for(let i=0;i<this.T.length;i++){
      var m1=this.T[i].Matr;
      var r=this.T[i].Id_role;
      
      
      if(m1==mat){
        
        return this.role.roleName(r);
      }
      
    }
    return "employé";
  }
  getUser(id){
    for(let i=0;i<this.T.length;i++){
      if(this.T[i].Id==id){
        return this.T[i]
      }
    }
    return 0
  }

  getUserLieu(mat:string){
    for(let i=0;i<this.T.length;i++){
      var m1=this.T[i].Matr;
      var l=this.T[i].Id_lieu;
      
      
      if(m1==mat){
        
        return [this.lieu.getGouv(l),this.lieu.getVil(l),this.lieu.getAg(l)];
      }
      
    }
    return "";
  }

  getUserLieuId(mat:string){
    for(let i=0;i<this.T.length;i++){
      var m1=this.T[i].Matr;
      
      if(m1==mat){
        
        return this.T[i].Id_lieu;
      }
      
    }
    return "";
  }
  getUserId(mat:string){
    for(let i=0;i<this.T.length;i++){
      var m1=this.T[i].Matr;
      
      if(m1==mat){
        
        return this.T[i].Id;
      }
      
    }
    return "";
  }

  getUserName(id:string){
    for(let i=0;i<this.T.length;i++){
      if(this.T[i].Id==id){
        return this.T[i].Nom
      }
    }
    return ""
  }
  getUserMatr(id:string){
    for(let i=0;i<this.T.length;i++){
      if(this.T[i].Id==id){
        return this.T[i].Matr
      }
    }
    return ""
  }
  getUserPhone(id:string){
    for(let i=0;i<this.T.length;i++){
      if(this.T[i].Id==id){
        return this.T[i].Num_tel
      }
    }
    return 0
  }
  getUserEmail(id:string){
    for(let i=0;i<this.T.length;i++){
      if(this.T[i].Id==id){
        return this.T[i].Email
      }
    }
    return ""
  }

  
}


