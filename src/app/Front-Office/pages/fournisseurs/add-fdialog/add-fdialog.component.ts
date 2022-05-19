import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategorieService } from '../../new-rec/categorie.service';
import { DialogData2 } from '../fournisseurs.component';
import { FournisseursService } from '../fournisseurs.service';

@Component({
  selector: 'app-add-fdialog',
  templateUrl: './add-fdialog.component.html',
  styleUrls: ['./add-fdialog.component.css']
})
export class AddFDialogComponent implements OnInit {
  cat : any = [];
  form : FormGroup;
  wrong=false;
  processing=true;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: DialogData2,
  private dialogRef: MatDialogRef<AddFDialogComponent>,
  private fb: FormBuilder,
  private categorie: CategorieService,
  private fourService: FournisseursService) { }
   
  ngOnInit(): void {
    this.categorie.categorie().subscribe((data)=>{
      this.cat=data
      this.form= this.fb.group({
        nom: new FormControl('',Validators.required),
        categ: new FormControl('',Validators.required),
        adresse: new FormControl('',Validators.required),
        num_tel: new FormControl('',Validators.required),
        email: new FormControl('',Validators.required)
      });
      this.processing=false;
    })
    
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
      //post it to api
      return this.fourService.postFour(value)
  .subscribe({
    next:(res)=>{
      alert("fournisseur ajouté");
      this.dialogRef.close();
    },
    error:()=>{
      alert("échec lors de l'ajout du fournisseur");
    }
  })  
      
    
    }
    else {
      this.wrong=true;
      return ''
    }
}


}
