import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})

/**
 * Abstract base class that encapsulates common logic for API services.
 * It handles URL construction, call execution, and error message translation.
 */
export abstract class BaseService {
  /**
   * Base URL
   */
  protected readonly API_ROOT = "https://swapi.py4e.com/";

  /**
   * Endpoint, used to send the http requests
   */
  protected abstract endpoint: string;

  constructor(protected http: HttpClient, private translateService: TranslateService) {}

  /**
   * Send a http get request
   */
  protected get<T>(path: string = ""): Observable<T> {
    const url = path ? `${this.API_ROOT}/${this.endpoint}/${path}` : `${this.API_ROOT}/${this.endpoint}`;

    return this.http.get<T>(url).pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Handling errors: send the correct errors to the console, if the request fails
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = this.translateService.instant("GENERAL_TEXTS.UNKNOWN_ERROR");

    if (error.error instanceof ErrorEvent) {
      errorMessage = this.translateService.instant("GENERAL_TEXTS.ERROR_MESSAGE", {message: error.error.message});
    } else {
      errorMessage = this.translateService.instant("GENERAL_TEXTS.ERROR_WITH_CODE", {status: error.status, message: error.message});
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
