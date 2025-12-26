import { Base } from "./base";

/**
 * Describes a vehicle data transfer object from SWAPI
 */
export interface VehicleDTO extends Base {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
}

/**
 * Describes a vehicle data
 */
export interface VehicleData extends Base {
  name: string;
  model: string;
  manufacturer: string;
  costInCredits: string;
  length: string;
  maxAtmospheringSpeed: string;
  crew: string;
  passengers: string;
  cargoCapacity: string;
  consumables: string;
  vehicleClass: string;
  pilots: string[];
  films: string[];
  image: string;
}
