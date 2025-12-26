import { computed, Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { PlanetData, PlanetDTO } from "../data-interfaces/planet";
import { forkJoin, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

/**
 * Service to manage planets
 */
export class Planet extends BaseService {
  /**
   * The endpoints for Star Wars planets
   */
  protected endpoint = "planets/";

  /**
   * List containing all planets
   */
  allPlanets = signal<PlanetData[]>([]);

  /**
   * Dictionary of all planets by Id
   */
  moviesMap = computed(() => new Map(this.allPlanets().map(planet => [planet.id, planet])));

  constructor(http: HttpClient, translate: TranslateService) {
    super(http, translate);
  }

  /**
   * Sends a request to retrieve all planets and sets the allPlanets signal
   */
  getAll() {
    this.get<{ results: any[] }>()
      .pipe(
        map((response) => response.results),
        map((dtos) => dtos.map((dto) => this.mapToPlanet(dto)))
      )
      .subscribe((movies) => this.allPlanets.set(movies));
  }

  /**
   * Sends a request to retrieve a planet by an id
   * @param {string} id
   * @return {Observable<PlanetData>}
   */
  getById(id: string): Observable<PlanetData> {
    return this.get<PlanetDTO>(id).pipe(map((dto) => this.mapToPlanet(dto)));
  }

  /**
   * Get multiple plantes by ids
   * @param {string[]} ids
   * @returns
   */
  getByIds(ids: string[]): Observable<PlanetData[]> {
    const requests = ids.map((id) => this.getById(id));

    return forkJoin(requests);
  }

  /**
   * Mapping converts raw backend data (DTO) into the internal data model (Interface).
   * This ensures decoupling between external APIs and application logic,
   * allowing keys to be normalised (from snake_case to camelCase)
   * and values to be pre-processed for components.
   */
  private mapToPlanet(dto: PlanetDTO): PlanetData {
    const id = dto.url.split("/").filter(Boolean).pop() || "";

    return {
      id,
      url: dto.url,
      created: dto.created,
      edited: dto.edited,
      climate: dto.climate,
      diameter: dto.diameter,
      films: dto.films,
      gravity: dto.gravity,
      name: dto.name,
      orbitalPeriod: dto.orbital_period,
      population: dto.population,
      residents: dto.residents,
      rotationPeriod: dto.rotation_period,
      surfaceWater: dto.surface_water,
      terrain: dto.terrain,
      image: `assets/images/planets/${id}.jpg`,
    };
  }
}
