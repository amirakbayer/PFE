import { Component, OnInit, Input } from '@angular/core';
import { CategorieService } from '../../pages/new-rec/categorie.service';
import { LieuService } from '../../utilisateur/lieu.service';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { RecServiceService } from '../rec-service.service';
import { reclam } from '../reclam';

@Component({
  selector: 'full',
  templateUrl: './full.component.html',
  //template: '',
  styleUrls: ['./full.component.css'],
  inputs: ['id']
})
export class FullComponent implements OnInit {
  id
  rec;
  processing=true;
  //rec! : reclam;
  //R0= new reclam("0","000","en attente","01/01/2000","00",1);
  constructor(
    private recService: RecServiceService,
    private lieu: LieuService,
    private categorie: CategorieService,
    private utilisateur:UtilisateurService) { 
    

  }
  
  ngOnInit(): void {
    this.recService.getRecDet(this.id).subscribe((data) => {
      this.rec=data;
      this.processing=false
    });
    //if(this.service.IdExists(this.ident)){
     // this.rec=<reclam> this.service.getRecDet(this.ident);
    //} else {
      //this.rec=this.R0;
    //}
    
    //console.log(this.rec);
  }

  getRec(id) {
    
  }

  gouv(id){
    return this.lieu.getGouv(id);
  }

  ville(id){
    return this.lieu.getVil(id);
  }
  agence(id){
    return this.lieu.getAg(id);
  }
  categN(id){
    return this.categorie.getCatName(id);
  }
  sCateg(id){
    return this.categorie.getsCatName(id);
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
  userMatr(id){
    return this.utilisateur.getUserMatr(id)
  }

}
