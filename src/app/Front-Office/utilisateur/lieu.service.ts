import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LieuService {
  T  = [ 
    {id:"1",gouv:"Tunis",ville:"Tunis",agence:"Tunis"},
    {id:"2",gouv:"Ariana",ville:"Ariana",agence:"Ariana"},
    {id:"3",gouv:"Ben Arous",ville:"Ben Arous",agence:"Ben Arous"},
  ]
  constructor() { }

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
