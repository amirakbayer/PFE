import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from 'src/app/Front-Office/pages/acceuil/acceuil.component';

import { NewRecComponent } from 'src/app/Front-Office/pages/new-rec/new-rec.component';
import { RecDetailsComponent } from 'src/app/Front-Office/pages/rec-details/rec-details.component';
import { AuthentificationComponent } from './Front-Office/pages/authentification/authentification.component';
import { FournisseursComponent } from './Front-Office/pages/fournisseurs/fournisseurs.component';
import { ProfilComponent } from './Front-Office/pages/profil/profil.component';
import { RecUpdateComponent } from './Front-Office/pages/rec-update/rec-update.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component:AuthentificationComponent},
  { path: 'acceuil', component: AcceuilComponent },
  
  { path: 'nouvelle-reclamation', component: NewRecComponent },
  { path: 'fournisseurs', component: FournisseursComponent},
  { path: 'fournisseurs/:id', component: FournisseursComponent},
  { path: 'profil', component: ProfilComponent},
  { path: 'reclamation-details/:id', component: RecDetailsComponent },
  { path: 'reclamation-update/:id', component: RecUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
