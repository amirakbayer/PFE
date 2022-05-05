import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { RecServiceService } from '../../reclamation/rec-service.service';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
//import { UtilisateurValidators } from '../../utilisateur/utilisateur.validators';
//import { DescriptionValidators } from './Description.Validators';
//import { EmplacementService } from './emplacement.service';
import { CategorieService } from './categorie.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-new-rec',
  templateUrl: './new-rec.component.html',
  styleUrls: ['./new-rec.component.css']
})
export class NewRecComponent implements OnInit {
  matricule;
  gouvernorat;
  ville;
  agence;
  wrong: boolean=false;
  id_reclamant;
  id_lieu;
  id_etat=1;
  id_affect="";
  date = new Date();
  processing=true;
  constructor(private categorie: CategorieService,
     private userService: UtilisateurService,
      private recService: RecServiceService,
       private fb: FormBuilder,
       private router: Router) { 
    
  }

  ngOnInit(): void {
    this.id_reclamant=localStorage.getItem('id');
    this.id_lieu=localStorage.getItem('id_lieu');
    this.matricule=localStorage.getItem('matricule');
    this.gouvernorat=localStorage.getItem('gouvernorat');
    this.ville=localStorage.getItem('ville');
    this.agence=localStorage.getItem('agence');
    
    this.categorie.categorie().subscribe((data) => {
      this.cat = data;
      console.log(this.cat);
      
      this.processing=false;
     })  

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
  

  cat : any = [];
  souscat : any = [];

  onSelect3(){
    var k=<string> this.categ.value;
    console.log("k is",k)
    this.categorie.souscategorie(k).subscribe((data) => {
      this.souscat = data;
      console.log(this.souscat);
      console.log(this.categ.value)

      
     })  ;
  }

 

 

  DescRequirement(s){
    if(s.target.value=="Autre"){
      this.form.get('description').setValidators(Validators.required);
      console.log(this.form.get('description').validator);
    }
  }


  form = new FormGroup({

    categ : new FormControl('',Validators.required),
    sousCateg : new FormControl('',Validators.required),
    description : new FormControl('',Validators.max(15)),
    urgence : new FormControl('1',Validators.required)
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
data
  saveNew(value) {  
    if(this.categ.valid && this.sousCateg.valid && this.description.valid){
      this.data={id_reclamant:this.id_reclamant,
                  id_lieu:this.id_lieu,
                  id_etat:this.id_etat,
                  date:this.date,
                  Id_sousCateg:value.sousCateg,
                  urg:value.urgence,
                  desc:value.description,
                  id_affect:this.id_affect}
      
    
    return this.recService.postRec(this.data)
    .subscribe({
      next:(res)=>{
        alert("réclamation envoyée");
        this.router.navigate(['/acceuil']);
      },
      error:()=>{
        alert("échec lors de l'envoi de la réclamation");
      }
    })  }
    else {
      this.wrong=true;
      return ''
    }

} 

}
