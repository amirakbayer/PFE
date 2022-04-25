import { Component, OnInit, OnDestroy } from '@angular/core';
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

@Component({
  selector: 'app-rec-details',
  templateUrl: './rec-details.component.html',
  styleUrls: ['./rec-details.component.css']
})
export class RecDetailsComponent implements OnInit, OnDestroy {
  raw3r9q: string = ' '
  id;
  private sub: any;
  modif=false;
  gouvernorat
  ville
  agence
  rec;
  selectedCategory;
  
  wrong=false;
  cat : any = [];
  souscat : any = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
     private recService:RecServiceService, 
     private categorie:CategorieService, 
     private utilisateur: UtilisateurService,
     private etat: EtatService, 
     private fb: FormBuilder) {
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
    this.rec = this.recService.getRecDet(this.id);
    console.log(this.rec);
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
    //use api to delete it 
    this.router.navigate(['/acceuil']);
  }
  onModif(){
    this.modif=true;
    
this.selectedCategory =this.rec.Id_sousCateg;
console.log("cat ", this.selectedCategory);
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
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  
}
