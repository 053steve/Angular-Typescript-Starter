import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DialogComponent } from '../../common/components/dialogs/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  dialogRef: MatDialogRef<DialogComponent>;
  constructor(
    private dialog: MatDialog
  ) { }

  public open(options) {
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
    });
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }));
  }
}
