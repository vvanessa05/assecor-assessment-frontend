import { Routes } from "@angular/router";
import { Home } from "./pages/home/home";
import { Movies } from "./pages/movies/movies";
import { MovieDetail } from "./pages/movies/movie-detail/movie-detail";
import { Characters } from "./pages/characters/characters";
import { CharacterDetail } from "./pages/characters/character-detail/character-detail";

export const routes: Routes = [
  {
    path: "home",
    component: Home,
  },
  {
    path: "movies",
    component: Movies,
    children: [
      {
        path: "details/:movieId",
        component: MovieDetail,
      },
    ],
  },
    {
    path: "characters",
    component: Characters,
    children: [
      {
        path: "details/:characterId",
        component: CharacterDetail,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "home",
  },
];
