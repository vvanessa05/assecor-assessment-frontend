import { computed, Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { StarshipData, StarshipDTO } from "./../data-interfaces/starship";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { forkJoin, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

/**
 * Service to managa the starships
 */
export class Starship extends BaseService {
  /**
   * The endpoint for Star Wars starships
   */
  protected endpoint = "starships/";

  /**
   * List containing all starships
   */
  allStarships = signal<StarshipData[]>([]);

  /**
   * Dictionary of startships by id
   */
  starshipsMap = computed(
    () => new Map(this.allStarships().map((starship) => [starship.id, starship]))
  );

  constructor(http: HttpClient, translate: TranslateService) {
    super(http, translate);
  }

  /**
   * Sends a request to retrieve all startships and sets the allStarships signal
   */
  getAll() {
    this.get<{ results: any[] }>()
      .pipe(
        map((response) => response.results),
        map((dtos) => dtos.map((dto) => this.mapToStarship(dto)))
      )
      .subscribe((movies) => this.allStarships.set(movies));
  }

  /**
   * Sends a request to retrieve a startship by an id
   * @param {string} id
   * @return {Observable<StarshipData>}
   */
  getById(id: string): Observable<StarshipData> {
    return this.get<StarshipDTO>(id).pipe(map((dto) => this.mapToStarship(dto)));
  }

  /**
   * Get multiple starships by ids
   * @param {string[]} ids
   * @returns {Observable<StarshipData[]>}
   */
  getByIds(ids: string[]): Observable<StarshipData[]> {
    const requests = ids.map((id) => this.getById(id));

    return forkJoin(requests);
  }

  /**
   * Mapping converts raw backend data (DTO) into the internal data model (Interface).
   * This ensures decoupling between external APIs and application logic,
   * allowing keys to be normalised (from snake_case to camelCase)
   * and values to be pre-processed for components.
   */
  private mapToStarship(dto: StarshipDTO): StarshipData {
    const id = dto.url.split("/").filter(Boolean).pop() || "";

    return {
      id,
      url: dto.url,
      created: dto.created,
      edited: dto.edited,
      cargoCapacity: dto.cargo_capacity,
      consumables: dto.consumables,
      costInCredits: dto.cost_in_credits,
      crew: dto.crew,
      films: dto.films,
      hyperdriveRating: dto.hyperdrive_rating,
      length: dto.length,
      manufacturer: dto.manufacturer,
      maxAtmospheringSpeed: dto.max_atmosphering_speed,
      MGLT: dto.MGLT,
      model: dto.model,
      name: dto.name,
      passengers: dto.passengers,
      pilots: dto.pilots,
      starshipClass: dto.starship_class,
      image: `assets/images/starships/${id}.jpg`,
    };
  }
}
