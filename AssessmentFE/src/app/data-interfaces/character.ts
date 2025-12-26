import { Base } from "./base";

/**
 * Describes a charachter data transfer object from SWAPI
 */
export interface CharacterDTO extends Base {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
}

/**
 * Describes a character item
 */
export interface CharacterInterface extends Base {
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  image: string;
   homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];

}
