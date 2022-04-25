import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmplacementService {

  constructor() { }

  gouvernorat(){
    return [
      {id:1, name:'Tunis'},
      {id:2, name:'Ariana'}
    ]
  }

  ville(){
    return [
      {id:1, id2:1, name:'Manar'},
      {id:1, id2:2, name:'Marsa'},
      {id:2, id2:3, name:'Soukra'},
      {id:2, id2:4, name:'Nasr'}
    ]
  }

  agence(){
    return[
      {id:1, name:'Manar1'},
      {id:1, name:'Manar2'},
      {id:2, name:'Marsa1'},
      {id:2, name:'Marsa2'},
      {id:3, name:'Soukra1'},
      {id:3, name:'Soukra2'},
      {id:4, name:'Nasr1'},
      {id:4, name:'Nasr2'}
    ]
  }

}
