/**
 * Desribes the label with its content
 */
export interface TextData {
  /**
   * The label of the data
   */
  label: string;

  /**
   * The content
   */
  content: string;
}

/**
 * Describes the data of a card
 */
export interface ItemData {
  /**
   * The path of the image to display
   */
  picture: string;

  /**
   * The title of the card
   */
  title: string;

  /**
   * The texts to display
   */
  texts: TextData[];
}
