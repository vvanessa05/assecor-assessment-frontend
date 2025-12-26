import { Component, computed, OnInit } from "@angular/core";
import { Movie } from "src/app/services/movie.service";
import { Card } from "src/app/components/card/card";
import { ItemData } from "src/app/models/card-data";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { ApplicationStateService } from "src/app/services/application-state.service";

@Component({
  selector: "app-movies",
  imports: [Card,  MatIconModule, RouterModule],
  templateUrl: "./movies.html",
  styleUrl: "./movies.scss",
})

/**
 * Componet to manage the movies
 */
export class Movies implements OnInit {
  /**
   * The items for the cards
   */
  items = computed<ItemData[]>(() => {
    const movies = this.movieService.allMovies();
    return movies.map((mov) => ({
      id: mov.id ?? "",
      picture: mov.image,
      title: mov.title,
      texts: [
        {
          label: "MOVIES.DIRECTOR",
          content: mov.director,
        },
        {
          label: "MOVIES.PRODUCER",
          content: mov.producer,
        },
        {
          label: "MOVIES.RELEASE_DATE",
          content: mov.releaseDate,
        },
      ],
    }));
  });

  constructor(private movieService: Movie, readonly applicationStateService: ApplicationStateService) {}

  /**
   * Init the movies to display
   */
  ngOnInit(): void {
    if (!this.movieService.allMovies().length) {
      this.movieService.getAll();
    }
  }
}
