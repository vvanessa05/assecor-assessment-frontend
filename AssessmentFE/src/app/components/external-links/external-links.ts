import { Component, input, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Link } from './../../models/link';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-external-links',
  imports: [TranslateModule, RouterModule, MatIcon, CommonModule],
  templateUrl: './external-links.html',
  styleUrl: './external-links.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        visibility: 'hidden',
        marginTop: '0px'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1,
        visibility: 'visible',
        marginTop: '1rem'
      })),
      transition('expanded <=> collapsed', [
        animate('400ms ease-in-out')
      ]),
    ]),
  ],
})
export class ExternalLinks {
  /**
   * The label to display
   */
  label = input('');

  /**
   * A list containing the links with text to display and route
   */
  links = input<Link[]>([]);

  isOpen = signal(false);

  toggle() {
    this.isOpen.update((open) => !open);
  }
}
