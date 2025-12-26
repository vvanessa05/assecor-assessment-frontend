import { InputFieldModel } from "./input-field";

/**
 * Describes the data necessary to create a dialog
 */
export interface DialogData {
  /**
   * Header of the dialog
   */
  header: string;

  /**
   * List of fields to display
   */
  fields: InputFieldModel[];

  /**
   * Label for the submit button
   */
  submitLabel: string;

  /**
   * Icon for the submit button
   */
  submitIcon: string;
}
