import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RoleService } from '../../utilisateur/role.service';
import { LieuService } from '../../utilisateur/lieu.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  constructor(private utilisateur:UtilisateurService,
    private route: ActivatedRoute,
    private router: Router,
    private roleS : RoleService,
    private lieuS : LieuService) { }
  role;
  matricule:string='';
  mdp:string='';
  id_lieu;
  lieu;
  id;
  wrong:boolean=false;
  empty1=false;
  empty2=false;
  user;
  ngOnInit(): void {
    localStorage.clear();
  }
  OnClick(){
    if(this.matricule==''||this.mdp==''){
      if(this.matricule==''){
        this.empty1=true;
      }
      if (this.mdp==''){
        this.empty2=true;
      }
      
    }else{

      this.utilisateur.getUserDetAtAuth(this.matricule,this.mdp).subscribe((data)=>{
        console.log("this is the user we are getting from server",data);
        if(Object.keys(data).length==0){
          this.wrong=true;
        } else{
            this.user=data;
            
            
            this.roleS.getRoleDet(this.user.id_role).subscribe((data)=>{
              this.role=data.nom
              console.log("role is",this.role)
            
            this.lieuS.getLieuDet(this.user.id_lieu).subscribe((data)=>{
              this.lieu=data
              console.log("lieu is ",this.lieu);
            localStorage.setItem('role',this.role);
            localStorage.setItem('id',this.user._id);
            localStorage.setItem('matricule',this.user.matricule);
            localStorage.setItem('id_lieu',this.user.id_lieu);
            localStorage.setItem('gouvernorat',this.lieu.gouv);
            localStorage.setItem('ville',this.lieu.ville);
            localStorage.setItem('agence',this.lieu.agence);
            this.router.navigate(['/acceuil']);
            setTimeout(()=>{
              localStorage.clear();
              console.log("your time is up ");
            },3600000)
            
            })
            })
          
    
        }
      }) 
      

    }
    
  }
}
