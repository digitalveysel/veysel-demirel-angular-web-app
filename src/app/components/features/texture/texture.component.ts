import { Component } from '@angular/core';

@Component({
  selector: 'vd-texture',
  template: `<span
    aria-hidden="true"
    class="pointer-events-none fixed inset-0 z-10 bg-[url(/images/texture.webp)] bg-size-[calc(--spacing(32))] bg-repeat opacity-[0.06] select-none"
  ></span>`,
})
export class TextureComponent {}
