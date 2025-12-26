import { Component, inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { DialogData } from "src/app/models/dialog-data";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogContent,
  MatDialogActions,
} from "@angular/material/dialog";
import { InputField } from "../input-field/input-field";
import { MatIcon } from "@angular/material/icon";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ToastMessageService } from "src/app/services/toast-service";
import { ToastType } from "src/app/utils/enums";
import { ToastrModule } from "ngx-toastr";
@Component({
  selector: "app-dialog",
  imports: [
    MatDialogContent,
    InputField,
    MatDialogActions,
    MatIcon,
    MatDialogModule,
    ReactiveFormsModule,
    TranslateModule,
    ToastrModule
  ],
  templateUrl: "./dialog.html",
  styleUrl: "./dialog.scss",
})

/**
 * Generic component for the dialogs
 */
export class Dialog implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<Dialog>);
  form: FormGroup = this.fb.group({});
  /**
   * Data of the dialog to open
   */
  public data: DialogData = inject(MAT_DIALOG_DATA);

  toastService = inject(ToastMessageService);

  translateService = inject(TranslateService);

  ngOnInit(): void {
    this.data.fields.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      this.form.addControl(field.key, new FormControl("", validators));
    });
  }

  /**
   * Close the dialog on save
   */
  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      this.toastService.renderToast(this.translateService.instant("TOASTS.HEADER.ERROR"),this.translateService.instant("TOASTS.CONTENT.ERROR"), ToastType.Error)
    }
  }

  /**
   * Close the dialog on cancel
   */
  onCancel() {
    console.log("on cancel");

    this.dialogRef.close();
    this.toastService.renderToast(this.translateService.instant("TOASTS.HEADER.CANCELED"),this.translateService.instant("TOASTS.CONTENT.CANCELED"), ToastType.Warning)

  }

  getControl(key: string): FormControl {
    return (this.form.get(key) as FormControl) || new FormControl();
  }
}
