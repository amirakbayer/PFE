import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilisateurService } from 'src/app/Front-Office/utilisateur/utilisateur.service';
import { userData } from '../profil.component';

@Component({
  selector: 'app-modif-mdp-dialog',
  templateUrl: './modif-mdp-dialog.component.html',
  styleUrls: ['./modif-mdp-dialog.component.css']
})
export class ModifMdpDialogComponent implements OnInit {

  mdpFormGroup:FormGroup
id;
wrong=false

  constructor(@Inject(MAT_DIALOG_DATA) public userData: userData,
  public formBuilder: FormBuilder,
  private utilisateur: UtilisateurService,
  private dialogRef: MatDialogRef<ModifMdpDialogComponent>) { }

  ngOnInit(): void {
    this.id=localStorage.getItem('id')
    this.mdpFormGroup = this.formBuilder.group({
      oldCtrl: new FormControl('',Validators.required),
      newCtrl:new FormControl('',Validators.required)
    });
  }

  get oldCtrl(){
    return this.mdpFormGroup.get('oldCtrl');
  }
  get newCtrl(){
    return this.mdpFormGroup.get('oldCtrl');
  }
incorrect=false
  onSubmit(form){
    if(this.oldCtrl.valid && this.newCtrl.valid){
      this.wrong=false
      if(form.oldCtrl!=this.userData.user.mdp){
        this.incorrect=true
      } else{
        this.incorrect=false
        this.userData.user.mdp=form.newCtrl
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
    } else{
      this.wrong=true
    }
  }
}
