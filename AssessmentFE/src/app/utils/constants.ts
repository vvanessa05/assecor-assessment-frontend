import { NavbarLink } from "../models/navbar-link";

/**
 * Containts the links for the navbar
 */
export const links: NavbarLink[] = [
  {
    icon: "movie",
    label: "NAVBAR.MOVIES",
    route: "movies"
  },
  {
    icon: "person",
    label: "NAVBAR.CHARACTERS",
    route: "characters"
  },
  {
    icon: "scatter_plot",
    label: "NAVBAR.PLANETS",
    route: "planets"
  },
];
