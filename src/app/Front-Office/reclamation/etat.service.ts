import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EtatService {
  T  = [ 
    {id:1,Nom:"en attente",altNom:"en attente"},
    {id:2,Nom:"recherche des fournisseurs",altNom:"en cours de traitement"},
    {id:3,Nom:"mise en accord",altNom:"en cours de traitement"},
    {id:4,Nom:"execution",altNom:"en cours de traitement"},
    {id:5,Nom:"finalisation",altNom:"en cours de traitement"},
    {id:6,Nom:"traitée",altNom:"traité"},
    {id:7,Nom:"invalide",altNom:"invalide"},
  ]

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
  constructor() { }
}
