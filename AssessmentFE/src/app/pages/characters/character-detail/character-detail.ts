import { Component, computed, inject } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { of, switchMap } from "rxjs";
import { MovieData } from "src/app/data-interfaces/movie";
import { SpecieData } from "src/app/data-interfaces/specie";
import { StarshipData } from "src/app/data-interfaces/starship";
import { VehicleData } from "src/app/data-interfaces/vehicle";
import { Link } from "src/app/models/link";
import { Character } from "src/app/services/character.service";
import { Movie } from "src/app/services/movie.service";
import { Planet } from "src/app/services/planet.service";
import { Specie } from "src/app/services/specie.service";
import { Starship } from "src/app/services/starship.service";
import { Vehicle } from "src/app/services/vehicle.service";
import { Overlay } from "src/app/components/overlay/overlay";
import { TextItemWithLabel } from "src/app/components/text-item-with-label/text-item-with-label";
import { TranslateModule } from "@ngx-translate/core";
import { ExternalLinks } from "src/app/components/external-links/external-links";

@Component({
  selector: "app-character-detail",
  imports: [Overlay, TextItemWithLabel, TranslateModule, ExternalLinks],
  templateUrl: "./character-detail.html",
  styleUrl: "./character-detail.scss",
})

/**
 * Component to show a detail of a character
 */
export class CharacterDetail {
  private activatedRoute = inject(ActivatedRoute);

  /**
   * Params of activated route
   */
  params = toSignal(this.activatedRoute.params);

  /**
   * Id of the current character
   */
  characterId = this.params()!["characterId"];

  /**
   * Character to display
   */
  character = computed(() => {
    return this.characterService.charactersMap().get(this.characterId) ?? null;
  });

  /**
   * Ids of the movies for this character
   */
  moviesIds = computed(() => {
    const movies = this.character()?.films;
    if (!movies) return [];

    return movies.map((url) => {
      const segments = url.split("/").filter(Boolean);

      return segments[segments.length - 1];
    });
  });

  /**
   * Movies of the current characters
   */
  movies = toSignal(
    toObservable(this.moviesIds).pipe(
      switchMap((ids: string[]) => {
        if (!ids || ids.length === 0) return of([]);
        return this.movieService.getByIds(ids);
      })
    ),
    { initialValue: [] as MovieData[] }
  );

  /**
   * The Movies links, used for the link buttons
   */
  moviesLinks = computed<Link[]>(() => {
    return this.movies().map((item) => ({
      label: item.title,
      route: `/movies/details/${item.id}`,
    }));
  });

  /**
   * Ids of films species
   */
  speciesIds = computed(() => {
    const species = this.character()?.species;
    if (!species) return [];

    return species.map((url) => {
      const segments = url.split("/").filter(Boolean);

      return segments[segments.length - 1];
    });
  });

  /**
   * List containing the species of the current character
   */
  species = toSignal(
    toObservable(this.speciesIds).pipe(
      switchMap((ids: string[]) => {
        if (!ids || ids.length === 0) return of([]);
        return this.specieService.getByIds(ids);
      })
    ),
    { initialValue: [] as SpecieData[] }
  );

  /**
   * The species links, used for the link buttons
   */
  speciesLinks = computed<Link[]>(() => {
    return this.species().map((item) => ({
      label: item.name,
      route: `/species/details/${item.id}`,
    }));
  });

  /**
   * Ids of films starships
   */
  starshipsIds = computed(() => {
    const starships = this.character()?.starships;
    if (!starships) return [];

    return starships.map((url) => {
      const segments = url.split("/").filter(Boolean);

      return segments[segments.length - 1];
    });
  });

  /**
   * List containing the starships of the current character
   */
  starships = toSignal(
    toObservable(this.starshipsIds).pipe(
      switchMap((ids: string[]) => {
        if (!ids || ids.length === 0) return of([]);
        return this.starshipService.getByIds(ids);
      })
    ),
    { initialValue: [] as StarshipData[] }
  );

  /**
   * The starships links, used for the link buttons
   */
  starshipsLinks = computed<Link[]>(() => {
    return this.starships().map((item) => ({
      label: item.name,
      route: `/starships/details/${item.id}`,
    }));
  });

  /**
   * Ids of films vehicles
   */
  vehiclesIds = computed(() => {
    const vehicles = this.character()?.vehicles;
    if (!vehicles) return [];

    return vehicles.map((url) => {
      const segments = url.split("/").filter(Boolean);

      return segments[segments.length - 1];
    });
  });

  /**
   * List containing the vehicles of the current character
   */
  vehicles = toSignal(
    toObservable(this.vehiclesIds).pipe(
      switchMap((ids: string[]) => {
        if (!ids || ids.length === 0) return of([]);
        return this.vehicleService.getByIds(ids);
      })
    ),
    { initialValue: [] as VehicleData[] }
  );

  /**
   * The vehicles links, used for the link buttons
   */
  vehiclesLinks = computed<Link[]>(() => {
    return this.vehicles().map((item) => ({
      label: item.name,
      route: `/vehicles/details/${item.id}`,
    }));
  });

  constructor(
    private movieService: Movie,
    private characterService: Character,
    private planetService: Planet,
    private starshipService: Starship,
    private vehicleService: Vehicle,
    private specieService: Specie
  ) {}
}
