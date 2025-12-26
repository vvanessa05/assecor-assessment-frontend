import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputFieldModel } from 'src/app/models/input-field';
import { InputValueType } from 'src/app/utils/enums';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-input-field',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss',
})

/**
 * Field component
 */
export class InputField {
  /**
   * The configuration model for the input field, including label, type, and validations.
   */
  field = input.required<InputFieldModel>();

  /**
   * The reactive form control associated with this specific input.
   */
  control = input.required<FormControl>();

  /**
   * Computed signal that returns true if the input type is a standard text field.
   */
  isText = computed(() => this.field().type === InputValueType.Text);

  /**
   * Computed signal that returns true if the input type is a multi-line text area.
   */
  isTextArea = computed(() => this.field().type === InputValueType.TextArea);

  /**
   * Computed signal that returns true if the input type is a numeric field.
   */
  isNumber = computed(() => this.field().type === InputValueType.Number);

  /**
   * Computed signal that returns true if the input type is a date picker.
   */
  isDate = computed(() => this.field().type === InputValueType.Date);

  /**
   * Computed signal that returns true if the input type is a dropdown/selection menu.
   */
  isSelection = computed(() => this.field().type === InputValueType.Selection);

  /**
   * Computed signal that groups basic input types (text, number, date)
   * that share a similar HTML structure.
   */
  isStandardInput = computed(() => this.isText() || this.isNumber() || this.isDate());
}
