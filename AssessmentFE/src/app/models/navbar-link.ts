/**
 * Describes a navbar button with its properties
 */
export interface NavbarLink {
  /**
   * The icon of the button
   */
  icon: string;

  /**
   * The label of the button
   */
  label: string;

  /**
   * The target route path for navigation
   */
  route: string;
}
