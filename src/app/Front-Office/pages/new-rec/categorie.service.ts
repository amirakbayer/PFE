import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  baseUri: string = 'http://localhost:4000/categorie';
  baseUri1: string = 'http://localhost:4000/sous_categorie';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  categ=[
    {id:1, name:'Ascenseur'},
    {id:2, name:'Climatisation'},
    {id:3, name:'Electricité'},
    {id:4, name:'Enseigne'},
    {id:5, name:'Génie Civil'},
    {id:6, name:'Menuiserie'},
    {id:7, name:'Plomberie'}
  ];

  sousCateg=[
    {id:1,id2:1,name:'Ascenseur en arrêt'},
    {id:1,id2:2, name:'Porte bloqué'},
    {id:1,id2:3, name:'Autre'},
    {id:2,id2:4, name:'Climatiseur en panne'},
    {id:2,id2:5, name:'Fuite d\'eau (condensant)'},
    {id:2,id2:6, name:'Autre'},
    {id:3,id2:7, name:'Multi-prise'},
    {id:3,id2:8, name:'Prise de courant'},
    {id:3,id2:9, name:'Eclairage intérieur défectueux'},
    {id:3,id2:10, name:'Eclairage extérieur: projecteur'},
    {id:3,id2:11, name:'Onduleur'},
    {id:3,id2:12, name:'Probléme électrique'},
    {id:3,id2:13, name:'Autre'},
    {id:4,id2:14, name:'Réparation enseigne façade en arabe'},
    {id:4,id2:15, name:'Réparation enseigne façade en français'},
    {id:4,id2:16, name:'Réparation enseigne drapeaux'},
    {id:4,id2:17, name:'Réparation enseigne money gramme'},
    {id:4,id2:18, name:'Totem horaire'},
    {id:4,id2:19, name:'Auvent GAB'},
    {id:4,id2:20, name:'Totem troittoire'},
    {id:4,id2:21, name:'Autre'},
    {id:5,id2:22, name:'Peinture'},
    {id:5,id2:23, name:'Faux plafond'},
    {id:5,id2:24, name:'Etancheité'},
    {id:5,id2:25, name:'Humidité'},
    {id:5,id2:26, name:'Carrelage'},
    {id:5,id2:27, name:'Façade extérieure'},
    {id:5,id2:28, name:'Rampe'},
    {id:5,id2:29, name:'Trottoire'},
    {id:5,id2:30, name:'Autre'},
    {id:6,id2:31, name:'Porte d\'entrée'},
    {id:6,id2:32, name:'Porte Aluminuim'},
    {id:6,id2:33, name:'Porte fer forgé'},
    {id:6,id2:34, name:'Porte rideaux métalliques'},
    {id:6,id2:35, name:'Fenêtre bois'},
    {id:6,id2:36, name:'Fenêtre aluminium'},
    {id:6,id2:37, name:'Fenêtre fer forgé'},
    {id:6,id2:38, name:'Fenêtre rideaux métalliques'},
    {id:6,id2:39, name:'Rideaux métalliques'},
    {id:6,id2:40, name:'Rideaux à lamelle'},
    {id:6,id2:41, name:'Store vénitien'},
    {id:7,id2:42, name:'Fuite d\'eau'},
    {id:7,id2:43, name:'Robinet'},
    {id:7,id2:44, name:'Flexible'},
    {id:7,id2:45, name:'Cuvette'},
    {id:7,id2:46, name:'Chasse d\'eau'},
    {id:7,id2:47, name:'Lavabo'},
    {id:7,id2:48, name:'Tuyautterie'},
    {id:7,id2:49, name:'Conduite d\'eau'},
    {id:7,id2:50, name:'Pompe'},
    {id:7,id2:51, name:'Autre'},
  ];

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
  categorie(){
    return this.http.get(`${this.baseUri}`);
  }
  
  souscategorie(id){
    let url = `${this.baseUri1}/${id}`;
    return this.http.get(url);
  }

  getCatDet(id:string): Observable<any>{
    let url = `${this.baseUri}/readCat/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
 }

 getSousCatDet(id:string): Observable<any>{
  let url = `${this.baseUri1}/readSousCat/${id}`;
  return this.http.get(url, { headers: this.headers }).pipe(
    map((res: Response) => {
      return res || {};
    }),
    catchError(this.errorMgmt)
  );
}

  getCatName(idS:number){
    var idC 
    for(let i=0;i<this.sousCateg.length;i++){
      if(this.sousCateg[i].id2==idS){
        idC= this.sousCateg[i].id;
      }
    }
    for(let i=0;i<this.categ.length;i++){
      if(this.categ[i].id==idC){
        return this.categ[i].name
      }
    }
    return ""
  }

  getCatId(idS:number){
    var idC 
    for(let i=0;i<this.sousCateg.length;i++){
      if(this.sousCateg[i].id2==idS){
        idC= this.sousCateg[i].id;
      }
    }
    for(let i=0;i<this.categ.length;i++){
      if(this.categ[i].id==idC){
        return this.categ[i].id
      }
    }
    return ""
  }

  getsCatName(idS:number){
    for(let i=0;i<this.sousCateg.length;i++){
      if(this.sousCateg[i].id2==idS){
        return this.sousCateg[i].name
      }
    }
    return ""
  }

  getCatNameFromItsID(id:number){
    for(let i=0;i<this.sousCateg.length;i++){
      if(this.categ[i].id==id){
        return this.categ[i].name
      }
    }
    return ""
  }
  
}
