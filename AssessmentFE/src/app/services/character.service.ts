import { computed, Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { forkJoin, from, map, Observable } from "rxjs";
import { CharacterDTO, CharacterInterface } from "../data-interfaces/character";

@Injectable({
  providedIn: "root",
})

/**
 * Service to manage the characters
 */
export class Character extends BaseService {
  /**
   * The endpoint for Star Wars characters.
   */
  protected endpoint = "people/";

  /**
   * List containing all characters
   */
  allCharacters = signal<CharacterInterface[]>([]);

  /**
   * Dictionary of all characters by Id
   */
  charactersMap = computed(() => new Map(this.allCharacters().map(character => [character.id, character])));

  constructor(http: HttpClient, translate: TranslateService) {
    super(http, translate);
  }

  /**
   * Sends a request to retrieve all characters and sets the allCharacters signal
   */
  getAll() {
    this.get<{ results: any[] }>()
      .pipe(
        map((response) => response.results),
        map((dtos) => dtos.map((dto) => this.mapToCharacter(dto)))
      )
      .subscribe((character) => this.allCharacters.set(character));
  }

  /**
   * Sends a request to retrieve a character by id
   * @param {string} id
   * @return {Observable<CharacterInterface>}
   * @memberof Character
   */
  getById(id: string): Observable<CharacterInterface> {
    return this.get<CharacterDTO>(id).pipe(map((dto) => this.mapToCharacter(dto)));
  }

  getByIds(ids: string[]): Observable<CharacterInterface[]> {
    const requests = ids.map((id) => this.getById(id));

    return forkJoin(requests);
  }

  /**
   * Mapping converts raw backend data (DTO) into the internal data model (Interface).
   * This ensures decoupling between external APIs and application logic,
   * allowing keys to be normalised (from snake_case to camelCase)
   * and values to be pre-processed for components.
   */
  private mapToCharacter(dto: CharacterDTO): CharacterInterface {
    const id = dto.url.split("/").filter(Boolean).pop() || "";

    return {
      id,
      url: dto.url,
      created: dto.created,
      edited: dto.edited,
      films: dto.films,
      homeworld: dto.homeworld,
      mass: dto.mass,
      height: dto.height,
      birthYear: dto.birth_year,
      eyeColor: dto.eye_color,
      gender: dto.gender,
      hairColor: dto.hair_color,
      name: dto.name,
      skinColor: dto.skin_color,
      starships: dto.starships,
      vehicles: dto.vehicles,
      species: dto.species,
      picture: `assets/images/people/${id}.jpg`,
    };
  }
}
