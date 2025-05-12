import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppStore } from '../../../core/store/app.store';
import { SoundService } from '../../../core/services/sound/sound.service';

interface IMenuItem {
  id: string;
  link: string;
  name: string;
}

@Component({
  selector: 'vd-navigation',
  imports: [RouterLink],
  template: `<nav
    id="menu"
    aria-label="Menu"
    class="fixed top-16 right-0 left-0 bg-neutral-800 lg:static lg:bg-transparent"
  >
    <ul class="flex flex-col gap-y-4 p-5 lg:flex-row lg:p-0">
      @for (item of navItems; track item.id) {
        <li>
          <a
            [id]="item.id"
            routerLink=""
            [fragment]="item.link"
            class="block border border-neutral-600 px-3 py-2 lg:px-3 lg:border-none {{
              store.activeSection() === item.link
                ? 'text-neutral-100 font-bold'
                : 'text-neutral-200'
            }}"
            (click)="onClick(item.link)"
          >
            {{ (store.activeSection() === item.link ? '#' : '') + item.name }}
          </a>
        </li>
      }
    </ul>
  </nav>`,
})
export class NavigationComponent {
  navItems: IMenuItem[] = [
    {
      id: 'heroAnchor',
      link: 'hero',
      name: 'hero',
    },
    {
      id: 'articlesAnchor',
      link: 'articles',
      name: 'articles',
    },
    {
      id: 'techStackAnchor',
      link: 'techStack',
      name: 'tech stack',
    },
    {
      id: 'coreSpecialitiesAnchor',
      link: 'coreSpecialities',
      name: 'core specialities',
    },
    {
      id: 'skillHighlightsAnchor',
      link: 'skillHighlights',
      name: 'skill highlights',
    },
  ];

  constructor(
    public store: AppStore,
    private soundService: SoundService,
  ) {}

  onClick(link: string): void {
    this.store.setIsMenuOpen(false);

    if (link != this.store.activeSection()) {
      this.soundService.play('scroll');
    }
  }
}
