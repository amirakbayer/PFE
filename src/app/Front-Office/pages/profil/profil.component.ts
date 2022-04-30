import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';

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
  constructor(private utilisateur : UtilisateurService) { }

  ngOnInit(): void {
this.id=localStorage.getItem('id');
this.user=this.utilisateur.getUser(this.id);
this.role=localStorage.getItem('role');
this.gouv=localStorage.getItem('gouvernorat');
this.ville=localStorage.getItem('ville');
this.agence=localStorage.getItem('agence');
  }

}
