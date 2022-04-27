import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../rec-update.component';

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.css']
})
export class FileDialogComponent implements OnInit {
  secondFormGroup: FormGroup;
  fournisseurs;
  constructor(@Inject(MAT_DIALOG_DATA) public fType: DialogData, private _formBuilder: FormBuilder,) {}


  ngOnInit(): void {
    this.fournisseurs=[{id:'1',name:'john Smith'},] ;//here u put the api to get list of fournisseurs
   this.secondFormGroup = this._formBuilder.group({
    secondCtrl: new FormControl(''),
    
  });
  
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
submit(form){
  for(let i=0;i<this.fileList.length;i++){
  this.data={
    fichier: this.fileList[i],
    id_f:form.secondCtrl ,
    id_type:this.fType.Type
  }
  
  ///here we use the api to post the files
  console.log('data is',this.data);
} 
console.log('secondCtrl', form.secondCtrl);
console.log('working on select');
console.log('listoffiles',this.listOfFiles);
  this.listOfFiles=[];
  this.fileList=[];
  this.secondFormGroup.reset();
}



}
