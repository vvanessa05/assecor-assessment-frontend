import { Component, computed, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Overlay } from "src/app/components/overlay/overlay";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { Movie } from "src/app/services/movie.service";
import { TranslateModule } from "@ngx-translate/core";
import { TextItemWithLabel } from "src/app/components/text-item-with-label/text-item-with-label";
import { ExternalLinks } from "src/app/components/external-links/external-links";
import { Link } from "src/app/models/link";
import { CharacterInterface } from "src/app/data-interfaces/character";
import { Character } from "src/app/services/character.service";
import { of, switchMap } from "rxjs";
import { Planet } from "src/app/services/planet.service";
import { PlanetData } from "src/app/data-interfaces/planet";
import { Starship } from "src/app/services/starship.service";
import { StarshipData } from "src/app/data-interfaces/starship";
import { Vehicle } from "src/app/services/vehicle.service";
import { VehicleData } from "src/app/data-interfaces/vehicle";
import { Specie } from "src/app/services/specie";
import { SpecieData } from "src/app/data-interfaces/specie";

@Component({
  selector: "app-movie-detail",
  imports: [Overlay, TranslateModule, TextItemWithLabel, ExternalLinks],
  templateUrl: "./movie-detail.html",
  styleUrl: "./movie-detail.scss",
})

/**
 * Component to show a detail of a movie
 */
export class MovieDetail {
  private activatedRoute = inject(ActivatedRoute);

  /**
   * Params of activated route
   */
  params = toSignal(this.activatedRoute.params);

  /**
   * Id of the current film
   */
  movieId = this.params()!["movieId"];

  /**
   * Film to display
   */
  film = computed(() => {
    return this.movieService.moviesMap().get(this.movieId) ?? null;
  });

  /**
   * Ids of the films characters
   */
  charactersIds = computed(() => {
    const characters = this.film()?.characters;
    if (!characters) return [];

    return characters.map((url) => {
      const segments = url.split("/").filter(Boolean);

      return segments[segments.length - 1];
    });
  });

  /**
   * Charachters of the current film
   */
  characters = toSignal(
    toObservable(this.charactersIds).pipe(
      switchMap((ids: string[]) => {
        if (!ids || ids.length === 0) return of([]);
        return this.characterService.getByIds(ids);
      })
    ),
    { initialValue: [] as CharacterInterface[] }
  );

  /**
   * The characters links, used for the link buttons
   */
  charactersLinks = computed<Link[]>(() => {
    return this.characters().map((item) => ({
      label: item.name,
      route: `/characters/details/${item.id}`,
    }));
  });

  /**
   * Ids of the films planets
   */
  planetIds = computed(() => {
    const planets = this.film()?.planets;
    if (!planets) return [];

    return planets.map((url) => {
      const segments = url.split("/").filter(Boolean);

      return segments[segments.length - 1];
    });
  });

  /**
   * List containing the planets of the current film
   */
  planets = toSignal(
    toObservable(this.planetIds).pipe(
      switchMap((ids: string[]) => {
        if (!ids || ids.length === 0) return of([]);
        return this.planetService.getByIds(ids);
      })
    ),
    { initialValue: [] as PlanetData[] }
  );

  /**
   * The characters links, used for the link buttons
   */
  planetsLinks = computed<Link[]>(() => {
    return this.planets().map((item) => ({
      label: item.name,
      route: `/planets/details/${item.id}`,
    }));
  });

  /**
   * Ids of films starships
   */
  starshipsIds = computed(() => {
    const starships = this.film()?.starships;
    if (!starships) return [];

    return starships.map((url) => {
      const segments = url.split("/").filter(Boolean);

      return segments[segments.length - 1];
    });
  });

  /**
   * List containing the starships of the current film
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
    const vehicles = this.film()?.vehicles;
    if (!vehicles) return [];

    return vehicles.map((url) => {
      const segments = url.split("/").filter(Boolean);

      return segments[segments.length - 1];
    });
  });

  /**
   * List containing the vehicles of the current film
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

  /**
   * Ids of films species
   */
  speciesIds = computed(() => {
    const species = this.film()?.species;
    if (!species) return [];

    return species.map((url) => {
      const segments = url.split("/").filter(Boolean);

      return segments[segments.length - 1];
    });
  });

  /**
   * List containing the species of the current film
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

  constructor(
    private movieService: Movie,
    private characterService: Character,
    private planetService: Planet,
    private starshipService: Starship,
    private vehicleService: Vehicle,
    private specieService: Specie
  ) {}
}
