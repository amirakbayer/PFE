import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  T  = [ 
    {id:"1",Nom:"employé"},
    {id:"2",Nom:"assistant"},
    {id:"3",Nom:"responsable"},
  ]
  roleName(id){
    
    for(let i=0;i<this.T.length;i++){
      if(this.T[i].id==id){
        return this.T[i].Nom;
      }
    }
    return "employé";
  }
  constructor() { }
}
