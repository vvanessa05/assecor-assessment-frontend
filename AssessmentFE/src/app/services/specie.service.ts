import { computed, Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { SpecieData, SpecieDTO } from "../data-interfaces/specie";
import { TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

/**
 * Service to manage the species
 */
export class Specie extends BaseService {
  /**
   * The endpoint for Star Wars species
   */
  protected endpoint = "species/";

  /**
   * List containing all species
   */
  allSpecies = signal<SpecieData[]>([]);

  /**
   * Dictionary of species by id
   */
  speciesMap = computed(() => new Map(this.allSpecies().map((specie) => [specie.id, specie])));

  constructor(http: HttpClient, translate: TranslateService) {
    super(http, translate);
  }

  /**
   * Sends a request to retrieve all species and sets the allSpecies signal
   */
  getAll() {
    this.get<{ results: any[] }>()
      .pipe(
        map((response) => response.results),
        map((dtos) => dtos.map((dto) => this.mapToSpecie(dto)))
      )
      .subscribe((movies) => this.allSpecies.set(movies));
  }

  /**
   * Sends a request to retrieve a specie by an id
   * @param {string} id
   * @return {Observable<SpecieData>}
   */
  getById(id: string): Observable<SpecieData> {
    return this.get<SpecieDTO>(id).pipe(map((dto) => this.mapToSpecie(dto)));
  }

  /**
   * Get multiple species by ids
   * @param {string[]} ids
   * @returns {Observable<SpecieData[]>}
   */
  getByIds(ids: string[]): Observable<SpecieData[]> {
    const requests = ids.map((id) => this.getById(id));

    return forkJoin(requests);
  }

  /**
   * Mapping converts raw backend data (DTO) into the internal data model (Interface).
   * This ensures decoupling between external APIs and application logic,
   * allowing keys to be normalised (from snake_case to camelCase)
   * and values to be pre-processed for components.
   */
  private mapToSpecie(dto: SpecieDTO): SpecieData {
    const id = dto.url.split("/").filter(Boolean).pop() || "";

    return {
      id,
      url: dto.url,
      created: dto.created,
      edited: dto.edited,
      averageHeight: dto.average_height,
      averageLifespan: dto.average_lifespan,
      classification: dto.classification,
      designation: dto.designation,
      eyeColors: dto.eye_colors,
      films: dto.films,
      hairColors: dto.hair_colors,
      homeworld: dto.homeworld,
      language: dto.language,
      name: dto.name,
      people: dto.people,
      skinColors: dto.skin_colors,
    };
  }
}
