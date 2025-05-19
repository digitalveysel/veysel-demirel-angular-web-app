import { Component, Input } from '@angular/core';

@Component({
  selector: 'vd-blockquote',
  template: `<blockquote
    class="text-14px mb-6 border-l-4 border-l-orange-400 pl-4 text-neutral-200 italic space-y-3 {{
      vdClass
    }}"
  >
    <p>
      {{ vdText }}
    </p>
    @if (vdCiteText) {
      <cite class="font-montserrat-alternates">— {{ vdCiteText }}</cite>
    }
  </blockquote>`,
})
export class BlockquoteComponent {
  @Input() vdClass = '';
  @Input() vdText = '';
  @Input() vdCiteText: string | undefined = '';
}
