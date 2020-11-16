import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ExclusionParameters {
  onConfirm: any;
  onCancel: any;
  title: string;
  message: string;
}

@Component({
  selector: 'app-exclusion-dialog',
  templateUrl: './exclusion-dialog.component.html',
  styleUrls: ['./exclusion-dialog.component.scss']
})
export class ExclusionDialogComponent implements OnInit {

  title = '';
  message = '';

  ngOnInit() {
    this.title = this.data.title;
    this.message = this.data.message;
  }

  constructor(private dialogRef: MatDialogRef<ExclusionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExclusionParameters) { }

  onConfirm() {
    this.data.onConfirm();
    this.dialogRef.close();
  }

  onCancel() {
    this.data.onCancel();
  }

  closeExclusionDialog() {
    this.dialogRef.close();
  }
}
