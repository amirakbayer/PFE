import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RecServiceService } from 'src/app/Front-Office/reclamation/rec-service.service';
import { DialogData1 } from '../rec-details.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: DialogData1,
                private router: Router,
                private dialogRef: MatDialogRef<DeleteDialogComponent>,
                private recService: RecServiceService) { }

  ngOnInit(): void {
  }

  onDelete(){
    //api to delete with this.dialogData.recId
    this.recService.deleteRec(this.dialogData.recId).subscribe((data) => {
      console.log("id in delete dialog", this.dialogData.recId)
      this.dialogRef.close();
    this.router.navigate(['/acceuil']);
    })
    
  }
  onCancel(){
    this.dialogRef.close();
  }

}
