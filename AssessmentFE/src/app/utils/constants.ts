import { Option } from "../models/input-field";
import { NavbarLink } from "../models/link";

/**
 * Containts the links for the navbar
 */
export const links: NavbarLink[] = [
  {
    icon: "home",
    label: "NAVBAR.HOME",
    route: "/home"
  },
  {
    icon: "movie",
    label: "NAVBAR.MOVIES",
    route: "/movies"
  },
  {
    icon: "person",
    label: "NAVBAR.CHARACTERS",
    route: "/characters"
  },
  {
    icon: "scatter_plot",
    label: "NAVBAR.PLANETS",
    route: "/planets"
  },
];

/**
 * Producer items for dropdowns
 */
export const producersItems: Option[] = [
  { label: "Gary Kurtz", value: 0 },
  { label: "Rick McCallum", value: 1 },
  { label: "Howard G.", value: 2 },
  { label: "Kazanjian", value: 3 },
  { label: "George Lucas", value: 4 },
  { label: "Rick McCallum", value: 5 },
  { label: "Kathleen Kennedy", value: 6 },
  { label: "J. J. Abrams", value: 7 },
  { label: "Bryan Burk", value: 8 },
];
