import { Component } from '@angular/core';
import { IconComponent } from '../../components/ui/icon/icon.component';

interface ISocialItems {
  id: string;
  name: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'vd-footer',
  imports: [IconComponent],
  template: `<footer class="pb-12 md:-ml-px lg:pb-16">
    <ul
      class="flex justify-center gap-x-2 border border-neutral-600 bg-neutral-800 p-2 md:p-6 lg:gap-x-4"
    >
      @for (item of items; track item.id) {
        <li>
          <a
            [id]="item.id"
            [href]="item.link"
            [attr.aria-label]="item.name"
            target="_blank"
            class="flex items-center justify-center p-2"
          >
            <vd-icon [vdName]="item.icon" vdSize="24" />
          </a>
        </li>
      }
    </ul>
  </footer>`,
})
export class FooterComponent {
  items: ISocialItems[] = [
    {
      id: 'githubAnchor',
      name: 'GitHub',
      icon: 'github',
      link: 'https://github.com/digitalveysel',
    },
    {
      id: 'figmaAnchor',
      name: 'Figma',
      icon: 'figma',
      link: 'https://www.figma.com/@digitalveysel',
    },
    {
      id: 'linkedInAnchor',
      name: 'LinkedIn',
      icon: 'linkedin',
      link: 'https://linkedin.com/in/digitalveysel',
    },
  ];
}
