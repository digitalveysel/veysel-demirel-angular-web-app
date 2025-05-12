import { Component, Input } from '@angular/core';

@Component({
  selector: 'vd-badge',
  template: `<span
    class="text-10px border border-orange-100 bg-orange-800 px-2 py-1 font-semibold text-orange-100"
  >
    {{ vdText }}
  </span>`,
})
export class BadgeComponent {
  @Input({ required: true }) vdText = 'VdBadge';
}
