import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullComponent } from './Front-Office/reclamation/full/full.component';
import { ReducedComponent } from './Front-Office/reclamation/reduced/reduced.component';

import { NavbarComponent } from './Front-Office/pages/navbar/navbar.component';
import { AcceuilComponent } from './Front-Office/pages/acceuil/acceuil.component';

import { NewRecComponent } from './Front-Office/pages/new-rec/new-rec.component';
import { RecDetailsComponent } from './Front-Office/pages/rec-details/rec-details.component';
import { RecServiceService } from './Front-Office/reclamation/rec-service.service';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './Front-Office/pages/acceuil/header/header.component';
import { UtilisateurComponent } from './Front-Office/utilisateur/utilisateur/utilisateur.component';
import { AuthentificationComponent } from './Front-Office/pages/authentification/authentification.component';
import { ProfilComponent } from './Front-Office/pages/profil/profil.component';
import { FournisseursComponent } from './Front-Office/pages/fournisseurs/fournisseurs.component';
import { RecUpdateComponent } from './Front-Office/pages/rec-update/rec-update.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { FileDialogComponent } from './Front-Office/pages/rec-update/file-dialog/file-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ModifDialogComponent } from './Front-Office/pages/rec-details/modif-dialog/modif-dialog.component';
import { DeleteDialogComponent } from './Front-Office/pages/rec-details/delete-dialog/delete-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import { ModifFDialogComponent } from './Front-Office/pages/fournisseurs/modif-fdialog/modif-fdialog.component';
import { DeleteFDialogComponent } from './Front-Office/pages/fournisseurs/delete-fdialog/delete-fdialog.component';
import { AddFDialogComponent } from './Front-Office/pages/fournisseurs/add-fdialog/add-fdialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ModifNumDialogComponent } from './Front-Office/pages/profil/modif-num-dialog/modif-num-dialog.component';
import { ModifMdpDialogComponent } from './Front-Office/pages/profil/modif-mdp-dialog/modif-mdp-dialog.component';







@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    ReducedComponent,
    
    NavbarComponent,
    AcceuilComponent,
    
    NewRecComponent,
    RecDetailsComponent,
    HeaderComponent,
    UtilisateurComponent,
    AuthentificationComponent,
    ProfilComponent,
    FournisseursComponent,
    RecUpdateComponent,
    
    FileDialogComponent,
    ModifDialogComponent,
    DeleteDialogComponent,
    ModifFDialogComponent,
    DeleteFDialogComponent,
    AddFDialogComponent,
    ModifNumDialogComponent,
    ModifMdpDialogComponent,
 
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTabsModule
  ],
  providers: [
    RecServiceService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
