import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { RecServiceService } from '../../reclamation/rec-service.service';
import { CategorieService } from '../new-rec/categorie.service';
import { AddFDialogComponent } from './add-fdialog/add-fdialog.component';
import { DeleteFDialogComponent } from './delete-fdialog/delete-fdialog.component';
import { FournisseursService } from './fournisseurs.service';
import { ModifFDialogComponent } from './modif-fdialog/modif-fdialog.component';

export interface FournisseurData {
  _id:number;
  nom: string;
  categ: number;
  adresse:string;
  num_tel: string;
  email: string;
}
export interface DialogData2 {
  _id;
}

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FournisseursComponent implements OnInit, AfterViewInit {
  private sub: any;
  id;
  role;
  fournisseurs;
  processing=true;
  displayedColumns: string[] = ['nom', 'categ', 'adresse', 'num_tel','email','action'];
  displayedColumns1: string[] = ['nom', 'categ', 'adresse', 'num_tel','email'];
  dataSource: MatTableDataSource<FournisseurData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private recService: RecServiceService,
    private categorie:  CategorieService,
    private dialog: MatDialog,
    private fourService: FournisseursService) { 
      // get fournisseurs first with api
      
    }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      
       //In a real app: dispatch action to load the details here.
      
   });
   console.log('id is',this.id);
   this.role=localStorage.getItem('role');
   this.readFours();
  }
  categName(id){
    console.log(id);
    console.log('categ name is working',this.categorie.getCatNameFromItsID(id));
    return this.categorie.getCatNameFromItsID(id);
    
  }

  readFours(){
    this.fourService.getFour().subscribe((data) => {
     this.fournisseurs = data;
     console.log(this.fournisseurs);
     this.dataSource = new MatTableDataSource(this.fournisseurs);
     this.processing=false;
    })  
  }

addFDialog(){
  this.dialog.open(AddFDialogComponent,{
    
  })
}
modifFDialog(id){
  this.dialog.open(ModifFDialogComponent,{
    data: {
      _id:id,
    }
  })
}
deleteFDialog(id){
  this.dialog.open(DeleteFDialogComponent,{
    data: {
      _id:id,
    }
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}


