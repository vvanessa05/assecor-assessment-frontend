import { Component, inject, OnInit, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Navbar } from "./components/navbar/navbar";
import { Search } from "./components/search/search";
import { MatIconModule } from "@angular/material/icon";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Navbar, Search, MatIconModule],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
/**
 * Root Component of the Application
 */
export class App implements OnInit {
  /**
   * Services injection using the modern inject() function
   * to maintain a clean constructor and stable DI tree.
   */
  private http = inject(HttpClient);
  private translate = inject(TranslateService);

  /**
   * Application title managed via Signal for fine-grained reactivity
   */
  protected readonly title = signal("AssessmentFE");

  /**
   * Lifecycle hook for component initialization.
   * STRATEGIC NOTE: We perform manual translation loading here to bypass the
   * NG0200 Circular Dependency error. By fetching the i18n JSON
   * inside ngOnInit, we ensure that HttpClient and TranslateService are fully
   * initialized before we attempt to populate the translation dictionary.
   */
  ngOnInit(): void {
    this.loadTranslations();
  }

  /**
   * Fetches the language file and updates the TranslateService.
   * This manual approach replaces the standard TranslateHttpLoader to stabilize
   * the Standalone bootstrap process.
   */
  private loadTranslations(): void {
    const lang = "en";
    this.http.get(`/assets/i18n/${lang}.json`).subscribe({
      next: (translations: any) => {
        this.translate.setTranslation(lang, translations);
        this.translate.use(lang);
      },
      error: (err) => {
        console.error(`Failed to load translations for ${lang}:`, err);
      }
    });
  }
}
