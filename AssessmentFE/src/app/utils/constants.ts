import { NavbarLink } from "../models/navbar-link";

/**
 * Containts the links for the navbar
 */
export const links: NavbarLink[] = [
  {
    icon: "local_movie",
    label: "NAVBAR.MOVIES",
    route: "movies"
  },
  {
    icon: "person",
    label: "NAVBAR.CHARACTERS",
    route: "characters"
  },
  {
    icon: "planet",
    label: "NAVBAR.PLANETS",
    route: "planets"
  },
]