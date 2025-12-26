import { computed, Injectable, signal } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, startWith } from "rxjs";

@Injectable({
  providedIn: "root",
})

/**
 * Service for the global informations of the app
 */
export class ApplicationStateService {
  /**
   * The currently visited URL
   */
  url = signal("");

  /**
   * If the overlay is open
   */
  overlayOpen = computed(() => {
    const urlSplitted = this.url().split("/");

    return urlSplitted.find(toFind => toFind === "details") ?? false;
  });

  /**
   * The current URL will be updated
   */
  constructor(private router: Router) {
       this.router.events.pipe(startWith(new NavigationEnd(0, this.router.url, this.router.url)),
            filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            this.url.set(event.url);
        });
  }

}
