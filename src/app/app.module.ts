import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullComponent } from './Front-Office/reclamation/full/full.component';
import { ReducedComponent } from './Front-Office/reclamation/reduced/reduced.component';
import { EtatComponent } from './Front-Office/reclamation/etat/etat.component';
import { NavbarComponent } from './Front-Office/pages/navbar/navbar.component';
import { AcceuilComponent } from './Front-Office/pages/acceuil/acceuil.component';
import { ContactComponent } from './Front-Office/pages/contact/contact.component';
import { NewRecComponent } from './Front-Office/pages/new-rec/new-rec.component';
import { RecDetailsComponent } from './Front-Office/pages/rec-details/rec-details.component';
import { RecServiceService } from './Front-Office/reclamation/rec-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EmplacementService } from './Front-Office/pages/new-rec/emplacement.service';
import { HeaderComponent } from './Front-Office/pages/acceuil/header/header.component';
import { UtilisateurComponent } from './Front-Office/utilisateur/utilisateur/utilisateur.component';
import { AuthentificationComponent } from './Front-Office/pages/authentification/authentification.component';
import { ProfilComponent } from './Front-Office/pages/profil/profil.component';
import { FournisseursComponent } from './Front-Office/pages/fournisseurs/fournisseurs.component';
import { RecUpdateComponent } from './Front-Office/pages/rec-update/rec-update.component';
import { ProgressComponent } from './Front-Office/pages/rec-update/progress/progress.component';
import { ProgressStepComponent } from './Front-Office/pages/rec-update/progress/progress-step/progress-step.component';
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


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    ReducedComponent,
    EtatComponent,
    NavbarComponent,
    AcceuilComponent,
    ContactComponent,
    NewRecComponent,
    RecDetailsComponent,
    HeaderComponent,
    UtilisateurComponent,
    AuthentificationComponent,
    ProfilComponent,
    FournisseursComponent,
    RecUpdateComponent,
    ProgressComponent,
    ProgressStepComponent,
    FileDialogComponent,
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
  ],
  providers: [
    RecServiceService,
    EmplacementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
