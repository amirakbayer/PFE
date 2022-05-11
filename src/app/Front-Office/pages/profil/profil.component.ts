import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { ModifMdpDialogComponent } from './modif-mdp-dialog/modif-mdp-dialog.component';
import { ModifNumDialogComponent } from './modif-num-dialog/modif-num-dialog.component';

export interface userData {
  user;
}

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
id;
user;
role;
gouv;
ville;
agence;
processing=true;
  constructor(private utilisateur : UtilisateurService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.length==0){
      this.router.navigate(['/login']);
      alert("veuillez vous connecter d'abord");
    }else {
      this.id=localStorage.getItem('id');
      this.role=localStorage.getItem('role');
      this.gouv=localStorage.getItem('gouvernorat');
      this.ville=localStorage.getItem('ville');
      this.agence=localStorage.getItem('agence');
      this.utilisateur.getUserDet(this.id).subscribe((data)=>{
        this.user=data
        this.processing=false;
      })
    }

  }

  numDialog(){
    this.dialog.open(ModifNumDialogComponent,{
      data: {
        user: this.user,
      },
    })
  }
  mdpDialog(){
    this.dialog.open(ModifMdpDialogComponent,{
      data: {
        user: this.user,
      },
    })
  }

}
