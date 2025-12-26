import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputFieldModel } from 'src/app/models/input-field';
import { InputValueType } from 'src/app/utils/enums';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-input-field',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss',
})

/**
 * Field component
 */
export class InputField {
  field = input.required<InputFieldModel>();

  control = input.required<FormControl>();

  isText = computed(() => this.field().type === InputValueType.Text);

  isTextArea = computed(() => this.field().type === InputValueType.TextArea);

  isNumber = computed(() => this.field().type === InputValueType.Number);

  isDate = computed(() => this.field().type === InputValueType.Date);

  isSelection = computed(() => this.field().type === InputValueType.Selection);

  isStandardInput = computed(() => this.isText() || this.isNumber() || this.isDate());
}
