import { Component, HostListener, input, signal } from "@angular/core";
import { NavbarLink } from "../../../models/navbar-link";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-navbar-button",
  imports: [CommonModule, RouterModule, MatIconModule],
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

  /**
   * Reactive state indicating if the button corresponds to the currently active route
   */
  selected = signal(false);

  @HostListener("mouseenter")
  onMouseEnter() {
    this.highlighted.set(true);
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.highlighted.set(false);
  }
}
