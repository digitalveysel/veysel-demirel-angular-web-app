import { Component } from '@angular/core';
import { IconComponent } from '../../shared/components/ui/icon/icon.component';
import { SoundButtonComponent } from '../../shared/components/ui/sound-button/sound-button.component';

@Component({
  selector: 'vd-footer',
  imports: [IconComponent, SoundButtonComponent],
  template: `<footer class="pb-12 md:-ml-px lg:pb-16">
    <ul class="flex justify-center gap-x-4 border border-neutral-600 bg-neutral-800 p-2 md:p-6">
      <li>
        <vd-sound-button />
      </li>
      <li>
        <button class="flex items-center justify-center p-2">
          <vd-icon name="rss" size="24" />
        </button>
      </li>
      <li>
        <button class="flex items-center justify-center p-2">
          <vd-icon name="github" size="24" />
        </button>
      </li>
      <li>
        <button class="flex items-center justify-center p-2">
          <vd-icon name="linkedin" size="24" />
        </button>
      </li>
    </ul>
  </footer>`,
})
export class FooterComponent {}
