import { Component, computed, OnInit } from "@angular/core";
import { Movie } from "src/app/services/movie.service";
import { Card } from "src/app/components/card/card";
import { ItemData } from "src/app/models/card-data";

@Component({
  selector: "app-movies",
  imports: [Card],
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

  constructor(private movieService: Movie) {}

  /**
   * Init the movies to display
   */
  ngOnInit(): void {
    if (!this.movieService.allMovies().length) {
      this.movieService.getAll();
    }
  }
}
