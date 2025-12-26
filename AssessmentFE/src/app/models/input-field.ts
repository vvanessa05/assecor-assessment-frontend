import { InputValueType } from "../utils/enums";

/**
 * Describe an option for the selection fields
 */
export interface Option {
  label: string;
  value: any;
}

/**
 * Describes an input field
 */
export interface InputFieldModel {
  /**
   * Form identifier
   */
  key: string;
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
  options?: Option[];

  /**
   * Customized error message
   */
  errorText?: string;
}
