import { Component } from '@angular/core';
import { IconComponent } from '../../shared/components/ui/icon/icon.component';

interface ISocialItems {
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
      @for (item of items; track item.icon) {
        <li>
          <a [href]="item.link" target="_blank" class="flex items-center justify-center p-2">
            <vd-icon [name]="item.icon" size="24" />
          </a>
        </li>
      }
    </ul>
  </footer>`,
})
export class FooterComponent {
  items: ISocialItems[] = [
    {
      icon: 'github',
      link: 'https://github.com/digitalveysel',
    },
    {
      icon: 'figma',
      link: 'https://www.figma.com/@digitalveysel',
    },
    {
      icon: 'linkedin',
      link: 'https://linkedin.com/in/digitalveysel',
    },
  ];
}
