import { Component, input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-text-item-with-label",
  imports: [TranslateModule],
  templateUrl: "./text-item-with-label.html",
  styleUrl: "./text-item-with-label.scss",
})

/**
 * Componet to display a text with its label
 */
export class TextItemWithLabel {
  /**
   * The label to translate
   */
  label = input("");

  /**
   * The text to display
   */
  content = input("");

}
