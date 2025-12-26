import { Component, computed, OnInit } from "@angular/core";
import { Movie } from "src/app/services/movie.service";
import { Card } from "src/app/components/card/card";
import { ItemData } from "src/app/models/card-data";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { ApplicationStateService } from "src/app/services/application-state.service";
import { DialogService } from "src/app/services/dialog-service";
import { DialogData } from "src/app/models/dialog-data";
import { InputValueType } from "src/app/utils/enums";
import { producersItems } from "src/app/utils/constants";

@Component({
  selector: "app-movies",
  imports: [Card, MatIconModule, RouterModule],
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

  dialogData: DialogData = {
    header: "MOVIES.ACTIONS.ADD",
    submitIcon: "check",
    submitLabel: "MOVIES.ACTIONS.ADD",
    fields: [
      {
        key: "title",
        label: "MOVIES.FIELDS.TITLE.LABEL",
        placeholder: "MOVIES.FIELDS.TITLE.PLACEHOLDER",
        required: true,
        type: InputValueType.Text,
        errorText: "GENERAL_TEXTS.REQUIRED_INVALID",
      },
      {
        key: "director",
        label: "MOVIES.FIELDS.DIRECTOR.LABEL",
        placeholder: "MOVIES.FIELDS.DIRECTOR.PLACEHOLDER",
        required: false,
        type: InputValueType.Text,
      },
      {
        key: "producer",
        label: "MOVIES.FIELDS.PRODUCER.LABEL",
        placeholder: "MOVIES.FIELDS.PRODUCER.PLACEHOLDER",
        options: producersItems,
        required: false,
        type: InputValueType.Selection,
      },
      {
        key: "releaseDate",
        label: "MOVIES.FIELDS.RELEASE_DATE.LABEL",
        placeholder: "",
        required: false,
        type: InputValueType.Date,
      },
      {
        key: "description",
        label: "MOVIES.FIELDS.DESCRIPTION.LABEL",
        placeholder: "MOVIES.FIELDS.DESCRIPTION.PLACEHOLDER",
        required: false,
        type: InputValueType.TextArea,
      },
    ],
  };

  constructor(
    private movieService: Movie,
    readonly applicationStateService: ApplicationStateService,
    private dialogService: DialogService
  ) {}

  /**
   * Init the movies to display
   */
  ngOnInit(): void {
    if (!this.movieService.allMovies().length) {
      this.movieService.getAll();
    }
  }

  openAddFilmDialog() {
    this.dialogService.openDialog(this.dialogData);
  }
}
