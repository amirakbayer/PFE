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
import { ModifFDialogComponent } from './modif-fdialog/modif-fdialog.component';

export interface FournisseurData {
  id_f:number;
  nom: string;
  categ: number;
  adresse:string;
  num_tel: string;
  email: string;
}
export interface DialogData2 {
  id_f;
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

  displayedColumns: string[] = ['nom', 'categ', 'adresse', 'num_tel','email','action'];
  dataSource: MatTableDataSource<FournisseurData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private recService: RecServiceService,
    private categorie:  CategorieService,
    private dialog: MatDialog) { 
      // get fournisseurs first with api
      this.fournisseurs=[
        {id_f:1,nom:'société a',categ:3,adresse:'1 rue 23',num_tel:'12345678',email:'abc@h.dn'},
        {id_f:2,nom:'société b',categ:5,adresse:'1 rue 22',num_tel:'12345678',email:'abc@h.dn'}
      ]
      this.dataSource = new MatTableDataSource(this.fournisseurs);
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
  }
  categName(id){
    console.log(id);
    console.log('categ name is working',this.categorie.getCatNameFromItsID(id));
    return this.categorie.getCatNameFromItsID(id);
    
  }
addFDialog(){
  this.dialog.open(AddFDialogComponent,{
    
  })
}
modifFDialog(id){
  this.dialog.open(ModifFDialogComponent,{
    data: {
      id_f:id,
    }
  })
}
deleteFDialog(id){
  this.dialog.open(DeleteFDialogComponent,{
    data: {
      id_f:id,
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


