import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  imports: [TranslateModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  onSearch() {
    // TODO: implement search
    throw new Error('Method not implemented.');
  }
}
