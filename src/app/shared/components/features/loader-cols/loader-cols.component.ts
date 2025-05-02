import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
  ViewChild,
  afterNextRender,
} from '@angular/core';
import { animate, stagger } from 'motion';

@Component({
  selector: 'vd-loader-cols',
  template: ` <div class="pointer-events-none fixed inset-0 z-9 flex select-none" #container>
    <span
      class="absolute -top-full left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-r from-neutral-900 via-neutral-100 to-neutral-900"
      #line
    ></span>
    <div class="flex flex-1">
      <span class="h-full flex-1 bg-neutral-800" #bg></span>
      <span class="h-0 w-px bg-neutral-600" #border></span>
    </div>
    <div class="hidden max-w-3xl flex-3 md:flex">
      <div class="flex flex-1">
        <span class="h-0 flex-1 bg-neutral-800" #bg></span>
        <span class="h-0 w-px bg-neutral-600" #border></span>
      </div>
      <div class="flex flex-1">
        <span class="h-full flex-1 bg-neutral-800" #bg></span>
        <span class="h-0 w-px bg-neutral-600" #border></span>
      </div>
      <div class="flex flex-1">
        <span class="h-0 flex-1 bg-neutral-800" #bg></span>
        <span class="h-0 w-px bg-neutral-600" #border></span>
      </div>
    </div>
    <div class="flex flex-1">
      <span class="h-full flex-1 bg-neutral-800" #bg></span>
    </div>
  </div>`,
})
export class LoaderColsComponent {
  @ViewChild('container') private containerElement!: ElementRef<HTMLDivElement>;
  @ViewChild('line') private lineElement!: ElementRef<HTMLSpanElement>;
  @ViewChildren('bg') private bgElements!: QueryList<ElementRef<HTMLSpanElement>>;
  @ViewChildren('border') private borderElements!: QueryList<ElementRef<HTMLSpanElement>>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    afterNextRender(() => {
      // Container animation
      animate(
        this.containerElement.nativeElement,
        { zIndex: -1 },
        { ease: 'linear', duration: 1, delay: 1 },
      );

      // Line animation
      animate(
        this.lineElement.nativeElement,
        { top: '100%' },
        { ease: 'easeInOut', duration: 0.6 },
      );

      // Borders animations
      animate(
        this.borderElements.map((el) => el.nativeElement),
        { height: '100%' },
        { ease: 'easeOut', duration: 0.6, delay: stagger(0.2, { startDelay: 0.2 }) },
      );

      // Backgrounds animations
      this.bgElements.forEach((el, i) => {
        if (i % 2 === 0) {
          animate(
            el.nativeElement,
            { height: '0' },
            { ease: 'easeOut', duration: 0.6, delay: i * 0.1 },
          );
        } else {
          animate(
            el.nativeElement,
            { height: '100%' },
            { ease: 'easeOut', duration: 0.6, delay: i * 0.2 },
          );
        }
      });
    });
  }
}
