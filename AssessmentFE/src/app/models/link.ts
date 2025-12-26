/**
 * Describes a navbar link
 */
export interface Link {
  /**
   * The label of the link
   */
  label: string;

  /**
   * The target route path for navigation
   */
  route: string;
}

/**
 * Describes a navbar link with icon
 */
export interface NavbarLink extends Link {
  /**
   * The icon of the link
   */
  icon: string;

}
