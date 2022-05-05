import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData2 } from '../fournisseurs.component';
import { FournisseursService } from '../fournisseurs.service';

@Component({
  selector: 'app-delete-fdialog',
  templateUrl: './delete-fdialog.component.html',
  styleUrls: ['./delete-fdialog.component.css']
})
export class DeleteFDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: DialogData2,
  private dialogRef: MatDialogRef<DeleteFDialogComponent>,
  private fourService:FournisseursService) { }

  ngOnInit(): void {
  }
  onDelete(){
    //api to delete with this.dialogData._id
    this.fourService.deleteFour(this.dialogData._id).subscribe((data) => {
      this.dialogRef.close()
    })
  }
  onCancel(){
    this.dialogRef.close();
  }
}
