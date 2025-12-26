import { computed, Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { VehicleData, VehicleDTO } from "../data-interfaces/vehicle";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { forkJoin, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

/**
 * Service to manage the vehicle
 */
export class Vehicle extends BaseService {
  /**
   * Endpoint for the Star Wars vehicles
   */
  protected endpoint = "vehicles/";

  /**
   * List containing all vehicles
   */
  allVehicles = signal<VehicleData[]>([]);

  /**
   * Dictionary cof vehicles by id
   */
  vehiclesMap = computed(() => new Map(this.allVehicles().map((vehicle) => [vehicle.id, vehicle])));

  constructor(http: HttpClient, translate: TranslateService) {
    super(http, translate);
  }

  /**
   * Sends a request to retrieve all vehicles and sets the allVehicles signal
   */
  getAll() {
    this.get<{ results: any[] }>()
      .pipe(
        map((response) => response.results),
        map((dtos) => dtos.map((dto) => this.mapToVehicle(dto)))
      )
      .subscribe((movies) => this.allVehicles.set(movies));
  }

  /**
   * Sends a request to retrieve a vehicle by an id
   * @param {string} id
   * @return {Observable<VehicleData>}
   */
  getById(id: string): Observable<VehicleData> {
    return this.get<VehicleDTO>(id).pipe(map((dto) => this.mapToVehicle(dto)));
  }

  /**
   * Get multiple vehicles by ids
   * @param {string[]} ids
   * @returns {Observable<VehicleData[]>}
   */
  getByIds(ids: string[]): Observable<VehicleData[]> {
    const requests = ids.map((id) => this.getById(id));

    return forkJoin(requests);
  }

  /**
   * Mapping converts raw backend data (DTO) into the internal data model (Interface).
   * This ensures decoupling between external APIs and application logic,
   * allowing keys to be normalised (from snake_case to camelCase)
   * and values to be pre-processed for components.
   */
  private mapToVehicle(dto: VehicleDTO): VehicleData {
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
      length: dto.length,
      manufacturer: dto.manufacturer,
      maxAtmospheringSpeed: dto.max_atmosphering_speed,
      model: dto.model,
      name: dto.name,
      passengers: dto.passengers,
      pilots: dto.pilots,
      vehicleClass: dto.vehicle_class,
      image: `assets/images/vehicles/${id}.jpg`,
    };
  }
}
