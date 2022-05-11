import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilisateurService } from 'src/app/Front-Office/utilisateur/utilisateur.service';
import { userData } from '../profil.component';

@Component({
  selector: 'app-modif-num-dialog',
  templateUrl: './modif-num-dialog.component.html',
  styleUrls: ['./modif-num-dialog.component.css']
})
export class ModifNumDialogComponent implements OnInit {

  numFormGroup: FormGroup;
  id;
  constructor(@Inject(MAT_DIALOG_DATA) public userData: userData,
  public formBuilder: FormBuilder,
  private utilisateur: UtilisateurService,
  private dialogRef: MatDialogRef<ModifNumDialogComponent>) { }

  ngOnInit(): void {
    this.id=localStorage.getItem('id')
    this.numFormGroup = this.formBuilder.group({
      numCtrl: new FormControl(''),
      
    });
  }
  get numCtrl(){
    return this.numFormGroup.get('numCtrl');
  }

  onSubmit(form){
    this.userData.user.num_tel=form.numCtrl;
    //update user
    console.log(this.userData.user)
    this.utilisateur.updateUser(this.id,this.userData.user).subscribe(
      {
        next:(res)=>{
          //close dialog
          this.dialogRef.close()
        }, error:()=>{
          alert("erreur lors de l'envoi")
        }
      }
    )
  }

}
