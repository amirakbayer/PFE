import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { reclam } from './reclam';

@Injectable({
  providedIn: 'root'
})
export class RecServiceService {
   R0= new reclam("","","",0,"",0,0);
   T: Array<reclam> = [
    new reclam("1","01","1",1,"12/04/2022",15,1,"abcd",""),
    new reclam("2","01","1",2,"12/04/2022",23,3,"abcd","02"),
    new reclam("3","02","2",4,"15/01/2022",42,2,"abcd","02"),
    new reclam("4","03","3",7,"16/02/2021",36,1,"abcd","02")
]
  constructor(private http: HttpClient) {
    
   }

   getReclamsOfUser(id:string){
     var r: Array<reclam> = [];
     for(let i=0;i< this.T.length;i++){
      if(this.T[i].id_reclamant==id){
        r.push(this.T[i])
      }
     }
     return r;
   }

   getAffRecs(id:string){
    var r: Array<reclam> = [];
    for(let i=0;i< this.T.length;i++){
     if(this.T[i].id_affect==id){
       r.push(this.T[i])
     }
    }
    return r;
  }

   postRec(data){
     return this.http.post<any>("http://localhost:3000/reclamations",data)
   }

    getRecDet(ident:string){

      const found = this.T.find(element => element.id == ident);
      if (typeof found == undefined){
        return this.R0;
        console.log("service rec");
      } else {
        var r= <reclam> found ;
        return r;
      }
   }
   IdExists(ident:string){
    const found = this.T.find(element => element.id == ident);
    if (typeof found == undefined){
      return false;
    } else {
      return true;
    }
   }
  

   
   getRec(){
      return this.T;
   }

  

}
