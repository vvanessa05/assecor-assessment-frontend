import { Base } from "./base";

/**
 *  Describes a specie data transfer object from SWAPI
 */
export interface SpecieDTO extends Base {
  name: string;
	classification: string,
	designation: string,
	average_height: string,
	skin_colors: string[],
	hair_colors: string[],
	eye_colors: string[],
	average_lifespan: string,
	homeworld: string,
	language: string,
	people: string[],
	films: string[]
}

/**
 * Describes a specie item
 */
export interface SpecieData extends Base {
  name: string;
	classification: string,
	designation: string,
	averageHeight: string,
	skinColors: string[],
	hairColors: string[],
	eyeColors: string[],
	averageLifespan: string,
	homeworld: string,
	language: string,
	people: string[],
	films: string[]
}
