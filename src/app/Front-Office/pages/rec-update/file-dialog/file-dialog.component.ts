import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FournisseursService } from '../../fournisseurs/fournisseurs.service';
import { DialogData } from '../rec-update.component';
import { UpdatesService } from '../updates.service';
import { FileService } from './file.service';

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.css']
})
export class FileDialogComponent implements OnInit {
  secondFormGroup: FormGroup;
  fournisseurs;
  processing=true;
  constructor(@Inject(MAT_DIALOG_DATA) public fType: DialogData,
   private _formBuilder: FormBuilder,
   private fileService: FileService,  
   private fournisseurService: FournisseursService,
   private updateService: UpdatesService) {}


  ngOnInit(): void {
    this.fournisseurService.getFour().subscribe((data)=>{
      this.fournisseurs=data 
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: new FormControl(''),
        
      });
      this.processing=false;
    });//here u put the api to get list of fournisseurs
   
  
  }
  get secondCtrl(){
    return this.secondFormGroup.get('firstCtrl');
  }
  

  @ViewChild('attachments') attachment: any;

fileList: File[] = [];
listOfFiles: any[] = [];

onFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.fileList.push(selectedFile);
      this.listOfFiles.push(selectedFile.name)
  }

  //this.attachment.nativeElement.value = '';

  console.log('listoffiles ',this.listOfFiles);
  console.log('filelist ',this.fileList);
  
}



removeSelectedFile(index) {
 // Delete the item from fileNames list
 this.listOfFiles.splice(index, 1);
 // delete file from FileList
 this.fileList.splice(index, 1);
}
data;
update
submit(form){
  for(let i=0;i<this.fileList.length;i++){
    this.fileService.uploadFile(this.fileList[i]).subscribe({
      next:(res)=>{
        //post the file name and id_f to database
        this.data={
          nom: this.fileList[i].name,
          id_f:form.secondCtrl ,
          id_type:this.fType.Type,
        }
        this.fileService.saveFile(this.data).subscribe({
          next:(res)=>{
            
            
            this.fileService.getFileDet(this.fileList[i].name).subscribe((data)=>{
              console.log("getFileDet data", data)
              var idFile=data._id
              this.update={
                id_rec: this.fType.id_rec,
                id_utilisateur: this.fType.id_user,
                id_etatA: this.fType.id_etatA,
                id_etatN: this.fType.id_etatN,
                date: this.fType.date,
                id_fichier: idFile
              }
              console.log("update data",this.update);
              this.updateService.saveUpdate(this.update).subscribe((data)=>{
                console.log("update is saved succesfully")
                if(i==this.fileList.length-1){
                  this.listOfFiles=[];
                this.fileList=[];
                this.secondFormGroup.reset();
                }
              })
              
            })

          },
          error:()=>{
            alert("échec lors du sauvegarde du fichier")
          }
        })
      },
      error:()=>{
        alert("échec lors de l'envoi du fichier");
      }
    })
  
  
  ///here we use the api to post the files
  console.log('data is',this.data);
} 

  
}



}
