import { Component, input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ItemData } from "src/app/models/card-data";
@Component({
  selector: "app-card",
  imports: [TranslateModule],
  templateUrl: "./card.html",
  styleUrl: "./card.scss",
})


/**
 * Component to display items in a card
 */
export class Card {
  /**
   * The item to display into the card
   */
  item = input.required<ItemData>();
}
