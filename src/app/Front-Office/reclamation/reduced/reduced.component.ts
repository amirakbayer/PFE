import { Component, OnInit } from '@angular/core';
import { RecServiceService } from '../rec-service.service';
import { reclam } from '../reclam';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CategorieService } from 'src/app/Front-Office/pages/new-rec/categorie.service';
import { EtatService } from '../etat.service';

export interface TableData {
  _id: number;
  date: Date;
  categorie: string;
  etat: string;
  
}

@Component({
  selector: 'app-reduced',
  templateUrl: './reduced.component.html',
  styleUrls: ['./reduced.component.css']
})
export class ReducedComponent implements OnInit {
  ownRecs;
  role;
  id;
  affRecs;
  allRecs;
  a
  constructor(private recService:RecServiceService, 
    private categorie:CategorieService , 
    private route: ActivatedRoute,
    private router: Router,
    private etat: EtatService) { 
      }

  ngOnInit(): void {
    this.role=localStorage.getItem('role');
    this.id=localStorage.getItem('id');
    this.readRecs();
    this.readOwnRecs();
    this.readAffRecs();
    
    this.a=1;
  }

  readRecs(){
    this.recService.getRec().subscribe((data) => {
     this.allRecs = data;
     console.log(this.allRecs)
    })    
  }
  T;
  readOwnRecs(){
    this.recService.getReclamsOfUser(this.id)
    .subscribe((data) => {
      this.T=data;
      this.ownRecs=Array.from({length:this.T.length}, (_, k) => this.transformData(k));
      console.log("ownRecs is",this.ownRecs);
      
      //this.allRecs = Array.of(this.allRecs);
     
  }) 
    //this.ownRecs=this.recService.getReclamsOfUser(this.id)
       
  }
  readAffRecs(){
    this.recService.getAffRecs(this.id)
    .subscribe((data) => {
      this.affRecs = data 
      console.log("affRecs is",this.ownRecs);
      //this.allRecs = Array.of(this.allRecs);
     })  
  }
  

  transformData(k: number):TableData{
    //it's better if I get the raw data here first so I can use this function to update 'Updates'
    var cat;
    var sCateg;
    var processing=true;
    this.categorie.getSousCatDet(this.T[k].Id_sousCateg).subscribe((data) =>{
      sCateg=data;
    this.categorie.getCatDet(sCateg.id2).subscribe(
      
      {
        next:(res)=>{
          cat= data.nom;
      console.log('cat name is',cat)
      processing=false;
          return{
            _id: this.T[k]._id,
            date: this.T[k].date ,
            categorie: cat ,
            etat: this.etatN(this.T[k].id_etat)}
        }, error:()=>{
          alert("échec lors de l'envoi de la réclamation");
        }
      }
      )
    })
     return {
      _id: this.T[k]._id,
      date: this.T[k].date ,
      categorie: '' ,
      etat: this.etatN(this.T[k].id_etat)
      
     }
   
 }

  aSet(x:number){
    this.a=x;
  }
  categ(idS){
    this.categorie.getCatDet(idS).subscribe((data) =>{
    return data.nom;
    });
  }
  etatN(id){
    return this.etat.etatName(id)
  }
  etatN_Emp(id){
    return this.etat.etatAltName(id)
  }
  

}
