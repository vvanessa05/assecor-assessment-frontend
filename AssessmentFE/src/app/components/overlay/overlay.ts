import { Component, output } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { Location } from "@angular/common";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-overlay",
  imports: [TranslateModule, MatIcon],
  templateUrl: "./overlay.html",
  styleUrl: "./overlay.scss",
})

/**
 * Overlay component, used to display details page
 */
export class Overlay {
  constructor(private location: Location) {}

  /**
   * Navigate to the previous url
   */
  goToPrevious() {
    this.location.back();
  }
}
