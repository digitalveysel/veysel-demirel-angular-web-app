import { Component, Input } from '@angular/core';

@Component({
  selector: 'vd-title',
  template: `
    @switch (vdLevel) {
      @case ('h1') {
        <h1
          class="font-montserrat-alternates text-24px lg:text-48px light:from-orange-500 light:to-orange-500 bg-linear-to-r from-orange-600 to-orange-300 bg-clip-text px-0 py-6 font-extrabold text-transparent lowercase first-letter:uppercase xl:px-6 xl:py-12"
        >
          {{ vdText }}
        </h1>
      }
      @case ('h2') {
        <h2 class="text-20px mb-3 font-semibold lowercase first-letter:uppercase">
          {{ vdText }}
        </h2>
      }
      @case ('h3') {
        <h3 class="text-16px mb-3 font-semibold lowercase first-letter:uppercase">
          {{ vdText }}
        </h3>
      }
      @case ('h4') {
        <h4 class="text-16px mb-3 lowercase first-letter:uppercase">
          {{ vdText }}
        </h4>
      }
      @case ('h5') {
        <h5 class="text-16px mb-3 lowercase first-letter:uppercase">
          {{ vdText }}
        </h5>
      }
      @case ('h6') {
        <h6 class="text-12px mb-3 lowercase first-letter:uppercase">
          {{ vdText }}
        </h6>
      }
    }
  `,
})
export class TitleComponent {
  @Input({ required: true }) vdLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
  @Input() vdText = '';
}
