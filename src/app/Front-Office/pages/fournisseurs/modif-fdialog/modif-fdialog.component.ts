import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategorieService } from '../../new-rec/categorie.service';
import { AddFDialogComponent } from '../add-fdialog/add-fdialog.component';
import { DialogData2 } from '../fournisseurs.component';

@Component({
  selector: 'app-modif-fdialog',
  templateUrl: './modif-fdialog.component.html',
  styleUrls: ['./modif-fdialog.component.css']
})
export class ModifFDialogComponent implements OnInit {
  cat : any = [];
  form : FormGroup;
  wrong=false;
  fournisseur;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: DialogData2,
  private dialogRef: MatDialogRef<AddFDialogComponent>,
  private fb: FormBuilder,
  private categorie: CategorieService) { }

  ngOnInit(): void {
    this.cat=this.categorie.categorie();
    //get fournisseur from api with dialogData.id_f
    this.fournisseur={id_f:1,nom:'société a',categ:1,adresse:'1 rue 23',num_tel:'12345678',email:'abc@h.dn'};
    this.form= this.fb.group({
      nom: new FormControl('',Validators.required),
      categ: new FormControl('',Validators.required),
      adresse: new FormControl('',Validators.required),
      num_tel: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required)
    });
    this.Categ.setValue(this.fournisseur.categ);
    this.Nom.setValue(this.fournisseur.nom);
    this.Adresse.setValue(this.fournisseur.adresse);
    this.Num_tel.setValue(this.fournisseur.num_tel);
    this.Email.setValue(this.fournisseur.email);
  }
  get Categ(){
    return this.form.get('categ')
  }
  get Nom(){
    return this.form.get('nom')
  }
  get Adresse(){
    return this.form.get('adresse')
  }
  get Num_tel(){
    return this.form.get('num_tel')
  }
  get Email(){
    return this.form.get('email')
  }
  submit(value){
    if(this.Categ.valid && this.Nom.valid && this.Adresse.valid && this.Num_tel.valid && this.Email.valid ){
    console.log('form data',value);  
    this.dialogRef.close();
    }
    else {
      this.wrong=true;
    }
  }

}
