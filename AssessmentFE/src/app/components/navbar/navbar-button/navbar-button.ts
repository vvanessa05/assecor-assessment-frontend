import { Component, computed, HostListener, inject, input, signal } from "@angular/core";
import { NavbarLink } from "../../../models/navbar-link";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-navbar-button",
  imports: [CommonModule, RouterModule, MatIconModule, TranslateModule],
  templateUrl: "./navbar-button.html",
  styleUrl: "./navbar-button.scss",
})

/**
 * Component representing a single navigation button within the navbar
 */
export class NavbarButton {
  /**
   * The configuration data for the button
   * @required
   */
  button = input.required<NavbarLink>();

  /**
   * Reactive state indicating if the button is currently hovered by the user
   */
  highlighted = signal(false);

  @HostListener("mouseenter")
  onMouseEnter() {
    this.highlighted.set(true);
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.highlighted.set(false);
  }
}
