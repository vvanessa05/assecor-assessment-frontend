import { Base } from "./base";

/**
 * Describes a movie data transfer object from SWAPI
 */
export interface MovieDTO extends Base {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
}

/**
 * Describes a movie item
 */
export interface MovieData extends Base {
  title: string;
  episodeId: number;
  openingCrawl: string;
  director: string;
  producer: string;
  releaseDate: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  image: string;
}
