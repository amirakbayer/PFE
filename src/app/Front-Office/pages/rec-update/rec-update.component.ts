
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component,Inject, OnInit, ViewChild ,ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RecServiceService } from '../../reclamation/rec-service.service';
import { MatStepper } from '@angular/material/stepper';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FileDialogComponent } from './file-dialog/file-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { getNumberOfCurrencyDigits } from '@angular/common';
import { getMatIconNameNotFoundError } from '@angular/material/icon';
import { LieuService } from '../../utilisateur/lieu.service';
import { CategorieService } from '../new-rec/categorie.service';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { UpdatesService } from './updates.service';
import { EtatService } from '../../reclamation/etat.service';
import { FileService } from './file-dialog/file.service';
import { FournisseursService } from '../fournisseurs/fournisseurs.service';
import { FileTypeService } from './file-dialog/file-type.service';

export interface DialogData {
  Type: number;
  id_rec;
  id_etatA;
  id_etatN;
  id_user;
  date;
}




export interface UpdatesData {
  Date: Date;
  Nom: string;
  Ancien_etat: string;
  Nouveau_etat:string;
  Fichier: string;
  Type_fichier: string;
  Fournisseur:string;
}




@Component({
  selector: 'app-rec-update',
  templateUrl: './rec-update.component.html',
   styleUrls: ['./rec-update.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecUpdateComponent implements OnInit, AfterViewInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  role;
  id;
  rec;
  assistants;
  private sub: any;
  rawData;
  Updates;
  processing=true;
  reclamant;
  assistant;
  isAffected=false;
  id_user;
  updateToSend;
  @ViewChild('stepper1',{ static: false }) stepper1: MatStepper;
  @ViewChild('stepper2',{ static: false }) stepper2: MatStepper;


  displayedColumns: string[] = ['Date', 'Nom', 'Ancien_etat', 'Nouveau_etat','Fichier','Type_fichier','Fournisseur'];
  dataSource: MatTableDataSource<UpdatesData>;

  @ViewChild(MatPaginator,{ static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort,{ static: false })
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private recService: RecServiceService,
    public dialog: MatDialog,
    private lieu: LieuService,
    private categorie: CategorieService,
    private utilisateur:UtilisateurService,
    private updateService: UpdatesService,
    private etatService: EtatService,
    private fichierService: FileService,
    private fournisseurService: FournisseursService,
    private typeFichierService: FileTypeService) { 
      
    //transform
    
    }
  
  ngOnInit(): void {
    if(localStorage.length==0){
      this.router.navigate(['/login']);
      alert("veuillez vous connecter d'abord");
    }else {
      this.id_user=localStorage.getItem('id');
      this.sub = this.route.params.subscribe(params => {
        this.id = params['id']; // (+) converts string 'id' to a number
        
         //In a real app: dispatch action to load the details here.
        
     });
     this.firstFormGroup = this._formBuilder.group({
      firstCtrl: new FormControl('',Validators.required),
    });
    
      
    this.recService.getRecDet(this.id).subscribe((data) => {
      this.rec=data;
      this.utilisateur.getUserDet(this.rec.id_reclamant).subscribe((data)=>{
        this.reclamant=data
        if(this.rec.id_affect!=""){
          this.utilisateur.getUserDet(this.rec.id_affect).subscribe((data)=>{
          this.assistant=data
          this.isAffected=true})
        }
          this.utilisateur.getAssistants(2).subscribe((data)=>{
            this.assistants=data
            this.readUpdates(this.rec._id);
            //this.processing=false;
          })
        //})
      })
      
      
    });

    
  
  this.role=localStorage.getItem('role');
  console.log(this.role);
    }
    
  }
  u;
  readUpdates(recId){
    console.log("recId is",recId)
      this.updateService.getRecUpdates(recId).subscribe((data)=>{
        this.u=data;
        console.log("u is", this.u);
        if(this.u.length==0){
          this.dataSource = new MatTableDataSource(this.Updates)
          this.processing=false;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else{
          this.Updates=Array.from({length:this.u.length}, (_, k) => this.transformData(k));
        }
      
      })
  }
  getRec(id) {
    
  }
  ngAfterViewInit() {
    
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
  userName(id){
    return this.utilisateur.getUserName(id)
  }
  
  userEmail(id){
    return this.utilisateur.getUserEmail(id)
  }
  userPhone(id){
    return this.utilisateur.getUserPhone(id);
  }

  get firstCtrl(){
    return this.firstFormGroup.get('firstCtrl');
  }
  
  nextstate(){
    var oldState=this.rec.id_etat;
    this.rec.id_etat+=1;
    //here you use api to update rec with new id_etat
    this.recService.updateRec(this.id, this.rec).subscribe({
      complete: () => {
        console.log('Content updated successfully!');
        this.updateToSend={
          id_rec: this.rec._id,
          id_utilisateur: this.id_user,
          id_etatA: oldState,
          id_etatN: this.rec.id_etat,
          date: new Date(),
          id_fichier: "",
        }
        this.updateService.saveUpdate(this.updateToSend).subscribe((data)=>{
          console.log("update is saved successfully")
        })
      },
      error: (e) => {
        console.log(e);
      },
    });
    //re-initialize rec with new values 
    
  } 
  
  AffectAndState(id_affect){
    var oldState=this.rec.id_etat;
    this.rec.id_affect=id_affect;
    this.rec.id_etat+=1;
    //here you use api to update rec with new id_etat and new id_affect
    //
    this.recService.updateRec(this.id, this.rec).subscribe({
      complete: () => {
        console.log('Content updated successfully!');
        this.updateToSend={
          id_rec: this.rec._id,
          id_utilisateur: this.id_user,
          id_etatA: oldState,
          id_etatN: this.rec.id_etat,
          date: new Date(),
          id_fichier: "",
        }
        this.updateService.saveUpdate(this.updateToSend).subscribe((data)=>{
          console.log("update is saved successfully")
        })
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  back(){
    var oldState=this.rec.id_etat;
    this.rec.id_etat=2;
    console.log('new rec.id_etat ',this.rec.id_etat);
    //here you use api to update rec with new id_etat
    this.recService.updateRec(this.id, this.rec).subscribe({
      complete: () => {
        console.log('Content updated successfully!');
        this.updateToSend={
          id_rec: this.rec._id,
          id_utilisateur: this.id_user,
          id_etatA: oldState,
          id_etatN: this.rec.id_etat,
          date: new Date(),
          id_fichier: "",
        }
        this.updateService.saveUpdate(this.updateToSend).subscribe((data)=>{
          console.log("update is saved successfully")
        })
        console.log('new stepper1 selected index ',this.stepper1);
    this.stepper2.selectedIndex = 1;
    console.log('new stepper2 selected index ',this.stepper2.selectedIndex);
      },
      error: (e) => {
        console.log(e);
      },
    });
    
    this.stepper1.selectedIndex = 1;
    
    
    
  }

  invalidate(){
    var oldState=this.rec.id_etat
    this.rec.id_etat=8;
    //here you use api to update rec with new id_etat
    this.recService.updateRec(this.id, this.rec).subscribe({
      complete: () => {
        console.log('Content updated successfully!');
        this.updateToSend={
          id_rec: this.rec._id,
          id_utilisateur: this.id_user,
          id_etatA: oldState,
          id_etatN: this.rec.id_etat,
          date: new Date(),
          id_fichier: "",
        }
        this.updateService.saveUpdate(this.updateToSend).subscribe((data)=>{
          console.log("update is saved successfully")
        })
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  openDialog(index: number) {
    this.dialog.open(FileDialogComponent, {
      data: {
        Type: index,
        id_rec: this.rec._id,
        id_etatA: this.rec.id_etat,
        id_etatN: this.rec.id_etat,
        id_user: this.id_user,
        date: new Date() ,
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  downloadFile(nom){
    var url=this.fichierService.downloadFile(nom)
    window.open(url)
  }
//processingData=true;
   transformData(k: number):UpdatesData{
     //it's better if I get the raw data here first so I can use this function to update 'Updates'
    this.utilisateur.getUserDet(this.u[k].id_utilisateur).subscribe(
      {
        next:(res)=>{
          this.Updates[k].Nom=res.nom 
          this.etatService.getEtatDet(this.u[k].id_etatA).subscribe(
            {
              next:(res)=>{
                this.Updates[k].Ancien_etat=res.nom
                this.etatService.getEtatDet(this.u[k].id_etatN).subscribe(
                  {
                    next:(res)=>{
                      this.Updates[k].Nouveau_etat=res.nom
                      if(this.u[k].id_fichier!=""){
                        console.log("there is a file")
                        this.fichierService.getFileDetByID(this.u[k].id_fichier).subscribe(
                          {
                            next:(res)=>{
                              this.Updates[k].Fichier=res.nom 
                              var id_f=res.id_f
                              var id_type=res.id_type 
                              this.typeFichierService.getFileType(id_type).subscribe(
                                {
                                  next:(res)=>{
                                    this.Updates[k].Type_fichier=res.nom;
                                    if(id_f!=""){
                                      this.fournisseurService.getFourDet(id_f).subscribe(
                                        {
                                          next:(res)=>{
                                            this.Updates[k].Fournisseur=res.nom;
                                            if(k==this.u.length-1){
                                              this.dataSource = new MatTableDataSource(this.Updates)
                                              this.processing=false;
                                              this.dataSource.paginator = this.paginator;
                                              this.dataSource.sort = this.sort;
                                            }
                                          }, error:()=>{
                                            alert("échec lors de chargement des mises à jour")
                                            }
                                        }
                                      )
                                    } else{
                                      if(k==this.u.length-1){
                                        this.dataSource = new MatTableDataSource(this.Updates)
                                        this.processing=false;
                                        this.dataSource.paginator = this.paginator;
                                        this.dataSource.sort = this.sort;
                                      }
                                    }
                                  }, error:()=>{
                                    alert("échec lors de chargement des mises à jour")
                            }
                                }
                              )
                              
                            }, error:()=>{
                              alert("échec lors de chargement des mises à jour")
                            }

                          }
                        )
                      } else{
                        if(k==this.u.length-1){
                          this.dataSource = new MatTableDataSource(this.Updates)
                          this.processing=false;
                          this.dataSource.paginator = this.paginator;
                          this.dataSource.sort = this.sort;
                        }
                      }
                      
                    }, error:()=>{
                      alert("échec lors de chargement des mises à jour")
                    }
                  }
                )

              }, error:()=>{
                alert("échec lors de chargement des mises à jour")
              }
            }
          )
        }, error:()=>{
          alert("échec lors de chargement des mises à jour")
        }
        
      }
    )
    
    console.log("updates outside of services", this.Updates)
     return{
      Date: this.u[k].date ,
      Nom: "",
      Ancien_etat: "",
      Nouveau_etat: "",
      Fichier: "",
      Type_fichier: "",
      Fournisseur:""
    }
  }

}






  
  
  




