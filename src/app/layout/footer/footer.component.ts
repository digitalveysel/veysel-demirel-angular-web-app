import { Component } from '@angular/core';
import { IconComponent } from '../../shared/components/ui/icon/icon.component';

@Component({
  selector: 'vd-footer',
  imports: [IconComponent],
  template: `<footer class="pb-16">
    <ul class="flex justify-center gap-x-4 border border-neutral-600 bg-neutral-800 p-3 md:p-6">
      <li>
        <button class="flex items-center justify-center p-3">
          <vd-icon name="volume-up" size="20" />
        </button>
      </li>
      <li>
        <button class="flex items-center justify-center p-3">
          <vd-icon name="rss" size="20" />
        </button>
      </li>
      <li>
        <button class="flex items-center justify-center p-3">
          <vd-icon name="github" size="20" />
        </button>
      </li>
      <li>
        <button class="flex items-center justify-center p-3">
          <vd-icon name="linkedin" size="20" />
        </button>
      </li>
    </ul>
  </footer>`,
})
export class FooterComponent {}
