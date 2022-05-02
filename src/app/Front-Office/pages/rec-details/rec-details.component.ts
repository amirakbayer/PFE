import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FullComponent } from '../../reclamation/full/full.component';
import { reclam } from '../../reclamation/reclam';
import { RecServiceService } from '../../reclamation/rec-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//import {  OnDestroy } from '@angular/core';
import { identifierName } from '@angular/compiler';
import { CategorieService } from '../new-rec/categorie.service';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { EtatService } from '../../reclamation/etat.service';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { ModifDialogComponent } from './modif-dialog/modif-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

export interface DialogData1 {
  recId;
}

@Component({
  selector: 'app-rec-details',
  templateUrl: './rec-details.component.html',
  styleUrls: ['./rec-details.component.css']
})
export class RecDetailsComponent implements OnInit,AfterViewInit, OnDestroy {
  raw3r9q: string = ' '
  id;
  private sub: any;
  modif=false;
  gouvernorat
  ville
  agence
  rec;
  currentState: any;
  selectedCategory;
  processing=true;
  
  @ViewChild('stepper1',{ static: false }) stepper1: MatStepper;
  wrong=false;
  cat : any = [];
  souscat : any = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
     private recService:RecServiceService, 
     private categorie:CategorieService, 
     private utilisateur: UtilisateurService,
     private etat: EtatService, 
     private fb: FormBuilder,
     public dialog: MatDialog,) {
    //this.recIds=this.recService.getReclamsOfUser(this.matricule);
    
    
  }
  //<full [ident]="id"></full>
  ngOnInit() {
    this.gouvernorat=localStorage.getItem('gouvernorat');
    this.ville=localStorage.getItem('ville');
    this.agence=localStorage.getItem('agence');
    this.cat=this.categorie.categorie();
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
       
        //In a real app: dispatch action to load the details here.
       
    });
    this.recService.getRecDet(this.id).subscribe((data) => {
      this.rec=data;
      console.log(this.rec)
      console.log("Id_etat: ", this.rec.id_etat);
    if(this.rec.id_etat==1){
      this.currentState = 0;
    }
    if(this.rec.id_etat>1&&this.rec.id_etat<7){
      this.currentState = 1;
    }
    if(this.rec.id_etat==7){
      this.currentState = 2;
    }
    this.processing=false;
    });
    
    
    //console.log(this.rec.id_etat-1);
    //console.log(this.stepper1);
    this.form = this.fb.group({  
      matricule: this.matricule,
      gouvernorat: this.gouvernorat,
      ville: this.ville,
      agence: this.agence,
      categ: this.categ,
      sousCateg: this.sousCateg,
      description: this.description,
      urgence:this.urgence
  });  
  }

  getRec(id) {
    
  }

  ngAfterViewInit() {
    //console.log(this.stepper1);
    
      //this.stepper1.selectedIndex = this.selectedIndex;
    
    //console.log(this.rec.id_etat-1);
    //console.log(this.stepper1.selectedIndex);
  }

  form = new FormGroup({

    categ : new FormControl('',Validators.required),
    sousCateg : new FormControl('',Validators.required),
    description : new FormControl('',Validators.max(15)),
    urgence : new FormControl('',Validators.required)
  })

  get description(){
    return this.form.get('description');
  }
  get urgence(){
    return this.form.get('urgence');
  }

  
  get categ(){
    return this.form.get('categ');
  }
  get sousCateg(){
    return this.form.get('sousCateg');
  }
  get matricule(){
    return this.form.get('matricule');
  }

  onSelect3(cat){
    this.souscat=this.categorie.souscategorie().filter(e=> e.id==cat.target.value);
    console.log("select 3");
  }
  DescRequirement(s){
    if(s.target.value=="Autre"){
      this.form.get('description').setValidators(Validators.required);
      console.log(this.form.get('description').validator);
    }
  }
  onDelete(){
    this.dialog.open(DeleteDialogComponent,{
      data: {
        recId:this.id,
      }
    })
    //use api to delete it 
    
  }
  onModif(){

    this.dialog.open(ModifDialogComponent, {
      data: {
        recId: this.id,
      },
    });
    //this.modif=true;
    
//this.selectedCategory =this.rec.Id_sousCateg;
//console.log("cat ", this.selectedCategory);
  }
  saveModif(value){
    if(this.categ.valid && this.sousCateg.valid && this.description.valid)
    {//send it to api
      //re-initialize rec with new values 
      this.modif=false;
    } 
    else {
      this.wrong=true;
    }

  }
  etatN(id){
    return this.etat.etatAltName(id)
  }
  categN(idS){
    return this.categorie.getCatName(idS)
  }
  categId(idS){
    return this.categorie.getCatId(idS)
  }
  sCateg(idS){
    return this.categorie.getsCatName(idS)
  }
  urgenceN(idU){
    if(idU==3){
      return "Trés urgente"
    }else if(idU==3){
      return "Assez urgente"
    }else{
      return "Peu urgente"
    }
  }
  userName(id){
    return this.utilisateur.getUserName(id)
  }
  
  userEmail(id){
    return this.utilisateur.getUserEmail(id)
  }
  userPhone(id){
    return this.utilisateur.getUserPhone(id);
  }

  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  
}
