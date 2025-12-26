import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogData } from "../models/dialog-data";
import { Dialog } from "../components/dialog/dialog";

@Injectable({
  providedIn: "root",
})

/**
 * Service to manage the dialogs
 */
export class DialogService {
  private dialog = inject(MatDialog);

  /**
   * Open a generic dialog
   * @param {DialogData} data
   */
  openDialog(data: DialogData) {
    const dialogRef = this.dialog.open(Dialog, {
      data,
      width: "550px",
      maxWidth: "94vw",
      disableClose: true,
      autoFocus: "first-tabbable",
      panelClass: "custom-dialog-container"
    });

    return dialogRef.afterClosed();
  }

}
