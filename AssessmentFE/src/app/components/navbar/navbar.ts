import { Component } from '@angular/core';
import { links } from 'src/app/utils/constants';
import { NavbarButton } from "./navbar-button/navbar-button";

@Component({
  selector: 'app-navbar',
  imports: [NavbarButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})

/**
 * Component representing the navbar
 */
export class Navbar {
  /**
   * Contains the links of the navbar
   */
  links = links;
}
