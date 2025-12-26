import { InputValueType } from "../utils/enums";

/**
 * Describes an input field
 */
export interface InputFieldModel {
  /**
   * Label of the input field
   */
  label: string;

  /**
   * The placeholder
   */
  placeholder: string;

  /**
   * Type of the input field
   */
  type: InputValueType;

  /**
   * If the field is required
   */
  required: boolean;

  /**
   * Options for the selection field
   */
  options?: { label: string, value: any }[];

  /**
   * Customized error message
   */
  errorText?: string;
}
