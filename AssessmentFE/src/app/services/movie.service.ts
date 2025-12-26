import { computed, Injectable, signal } from "@angular/core";
import { MovieData } from "../data-interfaces/movie";
import { BaseService } from "./base-service";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { MovieDTO } from "./../data-interfaces/movie";
import { forkJoin, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
/**
 * Service to manage the movies
 */
export class Movie extends BaseService {
  /**
   * The endpoint for Star Wars films.
   */
  protected endpoint = "films/";

  /**
   * List containing all movies
   */
  allMovies = signal<MovieData[]>([]);

  /**
   * Dictionary of all movies by Id
   */
  moviesMap = computed(() => new Map(this.allMovies().map((movie) => [movie.id, movie])));

  constructor(http: HttpClient, translate: TranslateService) {
    super(http, translate);
  }

  /**
   * Sends a request to retrieve all movies and sets the allMovies signal
   */
  getAll() {
    this.get<{ results: any[] }>()
      .pipe(
        map((response) => response.results),
        map((dtos) => dtos.map((dto) => this.mapToMovie(dto)))
      )
      .subscribe((movies) => this.allMovies.set(movies));
  }

  /**
   * Sends a request to retrieve a movie by an id
   * @param {string} id
   * @return {Observable<MovieData>}
   * @memberof Movie
   */
  getById(id: string): Observable<MovieData> {
    return this.get<MovieDTO>(id).pipe(map((dto) => this.mapToMovie(dto)));
  }

  /**
   * Get multiple movies by ids
   * @param ids
   * @returns
   */
  getByIds(ids: string[]): Observable<MovieData[]> {
    const requests = ids.map((id) => this.getById(id));

    return forkJoin(requests);
  }

  /**
   * Mapping converts raw backend data (DTO) into the internal data model (Interface).
   * This ensures decoupling between external APIs and application logic,
   * allowing keys to be normalised (from snake_case to camelCase)
   * and values to be pre-processed for components.
   */
  private mapToMovie(dto: any): MovieData {
    const id = dto.url.split("/").filter(Boolean).pop() || "";

    return {
      id,
      url: dto.url,
      created: dto.created,
      edited: dto.edited,
      title: dto.title,
      director: dto.director,
      producer: dto.producer,
      episodeId: dto.episode_id,
      openingCrawl: dto.opening_crawl,
      releaseDate: dto.release_date,
      characters: dto.characters,
      planets: dto.planets,
      starships: dto.starships,
      vehicles: dto.vehicles,
      species: dto.species,
      image: `assets/images/films/${id}.jpg`,
    };
  }
}
