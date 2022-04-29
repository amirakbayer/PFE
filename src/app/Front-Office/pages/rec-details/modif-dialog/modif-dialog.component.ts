import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EtatService } from 'src/app/Front-Office/reclamation/etat.service';
import { RecServiceService } from 'src/app/Front-Office/reclamation/rec-service.service';
import { LieuService } from 'src/app/Front-Office/utilisateur/lieu.service';
import { UtilisateurService } from 'src/app/Front-Office/utilisateur/utilisateur.service';
import { CategorieService } from '../../new-rec/categorie.service';
import { DialogData } from '../../rec-update/rec-update.component';
import { DialogData1 } from '../rec-details.component';

@Component({
  selector: 'app-modif-dialog',
  templateUrl: './modif-dialog.component.html',
  styleUrls: ['./modif-dialog.component.css']
})
export class ModifDialogComponent implements OnInit {
  rec;
  wrong=false;
  cat : any = [];
  souscat : any = [];
  defaultCateg;
  matr;
  g;
  v;
  a;
  defaultSCateg

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: DialogData1,
   private fb: FormBuilder,
   private recService:RecServiceService,
   private categorie:CategorieService, 
     private utilisateur: UtilisateurService,
     private lieu:LieuService, 
     private dialogRef: MatDialogRef<ModifDialogComponent>) { }

  ngOnInit(): void {
    this.rec=this.recService.getRecDet(this.dialogData.recId);
    this.defaultCateg=this.categorie.getCatId(this.rec.Id_sousCateg);
    
    this.cat=this.categorie.categorie();
    this.matr=this.utilisateur.getUserMatr(this.rec.id_reclamant);
    this.g=this.lieu.getGouv(this.rec.id_lieu);
    this.v=this.lieu.getVil(this.rec.id_lieu);
    this.a=this.lieu.getAg(this.rec.id_lieu)
    this.form = this.fb.group({  
      matricule: this.matr,
      gouvernorat: this.g,
      ville: this.v,
      agence: this.a,
      categ: this.categ,
      sousCateg: this.sousCateg,
      description: this.description,
      urgence:this.urgence
  });  
  this.categ.setValue(this.defaultCateg);
  this.sousCateg.setValue(this.rec.Id_sousCateg);
  this.description.setValue(this.rec.desc);
  this.urgence.setValue(this.rec.urg);
  console.log(this.sousCateg);
  this.souscat=this.categorie.souscategorie().filter(e=> e.id==this.categ.value);
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
  sCateg(idS){
    return this.categorie.getsCatName(idS)
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
  saveModif(value){
    if(this.categ.valid && this.sousCateg.valid && this.description.valid)
    {//send it to api
      //re-initialize rec with new values 
      this.dialogRef.close();
    } 
    else {
      this.wrong=true;
    }

  }

}
