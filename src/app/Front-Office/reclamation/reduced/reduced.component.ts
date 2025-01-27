import { Component, OnInit, ViewChild } from '@angular/core';
import { RecServiceService } from '../rec-service.service';
import { reclam } from '../reclam';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CategorieService } from 'src/app/Front-Office/pages/new-rec/categorie.service';
import { EtatService } from '../etat.service';
import { MatPaginator } from '@angular/material/paginator';

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
  a=0;
 
  ownLength;
  ownPage: number =1;
  
  affLength;
  affPage: number =1;

  allLength;
  allPage: number =1;

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
T1;
  readRecs(){
    this.recService.getRec().subscribe((data) => {
     this.T1 = data;
     this.allRecs=Array.from({length:this.T1.length}, (_, k) => this.transformData1(k));
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
      
    
     
  }) 
    
       
  }
  T2;
  readAffRecs(){
    this.recService.getAffRecs(this.id)
    .subscribe((data) => {
      this.T2 = data; 
      this.affRecs=Array.from({length:this.T2.length}, (_, k) => this.transformData2(k));
      console.log("affRecs is",this.affRecs);
      
     })  
  }
  
  processing=true;
  transformData(k: number):TableData{
    //it's better if I get the raw data here first so I can use this function to update 'Updates'
    var cat;
    var sCateg;
     var et;
    this.categorie.getSousCatDet(this.T[k].Id_sousCateg).subscribe((data) =>{
      sCateg=data;
    this.categorie.getCatDet(sCateg.id2).subscribe(
      
      {
        next:(res)=>{
          cat= res.nom;
      console.log('cat name is',cat)
      this.ownRecs[k].categorie=cat;
      console.log('ownRecs after subscribe',this.ownRecs)
      this.etat.getEtatDet(this.T[k].id_etat).subscribe((data)=>
      { et=data.altNom;
        this.ownRecs[k].etat=et;
        console.log("etat is",et)
        if(k==this.ownRecs.length-1){
          this.processing=false;
          this.filteredOwnRecs=this.ownRecs
          this.ownLength=this.ownRecs.length;
          console.log("ownrecs at last", this.ownRecs)
        }
      })
      
          
        }, error:()=>{
          alert("échec lors de chargement");
          
        }
      }
      )
    })
    return {
      _id: this.T[k]._id,
      date: this.T[k].date ,
      categorie: '' ,
      etat: ''
      
     }
   
 }


 processing1=true;
  transformData1(k: number):TableData{
    //it's better if I get the raw data here first so I can use this function to update 'Updates'
    var cat;
    var sCateg;
    var et;
    this.categorie.getSousCatDet(this.T1[k].Id_sousCateg).subscribe((data) =>{
      sCateg=data;
    this.categorie.getCatDet(sCateg.id2).subscribe(
      
      {
        next:(res)=>{
          cat= res.nom;
      console.log('cat name is',cat)
      this.allRecs[k].categorie=cat;
      console.log('allRecs after subscribe',this.allRecs)
      this.etat.getEtatDet(this.T1[k].id_etat).subscribe((data)=>
      { et=data.nom;
        this.allRecs[k].etat=et;
        console.log("etat is",et)
        if(k==this.allRecs.length-1){
          this.processing1=false;
          console.log("allrecs at last", this.allRecs)
          this.filteredAllRecs=this.allRecs;
          this.allLength=this.allRecs.length;
        }
      })
          
        }, error:()=>{
          alert("échec lors de chargement");
          
        }
      }
      )
    })
    return {
      _id: this.T1[k]._id,
      date: this.T1[k].date ,
      categorie: '' ,
      etat: ''
      
     }
   
 }


 processing2=true;
  transformData2(k: number):TableData{
    //it's better if I get the raw data here first so I can use this function to update 'Updates'
    var cat;
    var sCateg;
    var et; 
    this.categorie.getSousCatDet(this.T2[k].Id_sousCateg).subscribe((data) =>{
      sCateg=data;
    this.categorie.getCatDet(sCateg.id2).subscribe(
      
      {
        next:(res)=>{
          cat= res.nom;
      console.log('cat name is',cat)
      this.affRecs[k].categorie=cat;
      console.log('affRecs after subscribe',this.affRecs)
      this.etat.getEtatDet(this.T2[k].id_etat).subscribe((data)=>
      { et=data.nom;
        this.affRecs[k].etat=et;
        console.log("etat is",et)
        if(k==this.affRecs.length-1){
          this.processing2=false;
          console.log("affrecs at last", this.affRecs)
          this.filteredAffRecs=this.affRecs;
          this.affLength=this.affRecs.length;
        }
      })
          
        }, error:()=>{
          alert("échec lors de chargement");
          
        }
      }
      )
    })
    return {
      _id: this.T2[k]._id,
      date: this.T2[k].date ,
      categorie: '' ,
      etat: ''
      
     }
   
 }

filteredOwnRecs;
 applyfilterforown(value){
   console.log("I'm in apply filter")
   console.log("value from filter function ", value)
   if(value.length){
    this.filteredOwnRecs= this.ownRecs.filter(r=> value.includes(r.etat))
   } else{
     this.filteredOwnRecs=this.ownRecs
   }
   
 }
filteredAffRecs

 applyfilterforAff(value){
  console.log("I'm in apply filter")
  console.log("value from filter function ", value)
  if(value.length){
    if(value.includes("en cours de traitement")){
      value.push("devis","contrats","ordres d'exection","factures","vérification")
    }
   this.filteredAffRecs= this.affRecs.filter(r=> value.includes(r.etat))
  } else{
    this.filteredAffRecs=this.affRecs
  }
  
}

filteredAllRecs
applyfilterforAll(value){
  console.log("I'm in apply filter")
  console.log("value from filter function ", value)
  if(value.length){
    if(value.includes("en cours de traitement")){
      value.push("devis","contrats","ordres d'exection","factures","vérification")
    }
   this.filteredAllRecs= this.allRecs.filter(r=> value.includes(r.etat))
  } else{
    this.filteredAllRecs=this.allRecs
  }
  
}


  

}
