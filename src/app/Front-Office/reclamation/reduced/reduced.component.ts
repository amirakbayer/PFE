import { Component, OnInit } from '@angular/core';
import { RecServiceService } from '../rec-service.service';
import { reclam } from '../reclam';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CategorieService } from 'src/app/Front-Office/pages/new-rec/categorie.service';
import { EtatService } from '../etat.service';

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
    
    
    this.a=1;
  }

  readRecs(){
    this.recService.getRec().subscribe((data) => {
     this.allRecs = data;
     console.log(this.allRecs)
    })    
  }
  readOwnRecs(){
    this.recService.getReclamsOfUser(this.id)
    .subscribe((data) => {
      this.ownRecs = data 
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
  

  aSet(x:number){
    this.a=x;
  }
  categ(idS){
    return this.categorie.getCatName(idS)
  }
  etatN(id){
    return this.etat.etatName(id)
  }
  etatN_Emp(id){
    return this.etat.etatAltName(id)
  }
  

}
