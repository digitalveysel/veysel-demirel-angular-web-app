import { Component } from '@angular/core';
import { IconComponent } from '../../components/ui/icon/icon.component';
import { SoundButtonComponent } from '../../components/ui/sound-button/sound-button.component';

interface ISocialItems {
  id: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'vd-footer',
  imports: [IconComponent, SoundButtonComponent],
  template: `<footer class="pb-12 md:-ml-px lg:pb-16">
    <ul
      class="flex justify-center gap-x-2 border border-neutral-600 bg-neutral-800 p-2 md:p-6 lg:gap-x-4"
    >
      <li>
        <vd-sound-button />
      </li>
      @for (item of items; track item.id) {
        <li>
          <a
            [id]="item.id"
            [href]="item.link"
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
      icon: 'github',
      link: 'https://github.com/digitalveysel',
    },
    {
      id: 'figmaAnchor',
      icon: 'figma',
      link: 'https://www.figma.com/@digitalveysel',
    },
    {
      id: 'linkedInAnchor',
      icon: 'linkedin',
      link: 'https://linkedin.com/in/digitalveysel',
    },
  ];
}
