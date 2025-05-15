import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  ViewChild,
  afterNextRender,
  signal,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { animate, stagger } from 'motion';
import { filter } from 'rxjs';
import { AppStore } from '../../../core/store/app.store';

@Component({
  selector: 'vd-loader-cols',
  template: ` <div
    aria-hidden="true"
    class="pointer-events-none fixed inset-0 z-8 flex select-none"
    #container
  >
    <span
      class="absolute -top-full left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-r from-neutral-100 via-neutral-100 to-neutral-900"
      #line
    ></span>
    <div class="flex flex-1">
      <span class="h-full flex-1 bg-neutral-800" #bg></span>
      <span class="h-0 w-px bg-neutral-600" #border></span>
    </div>
    <div class="hidden max-w-3xl flex-3 md:flex">
      <div class="flex flex-1">
        <span class="h-full flex-1 bg-neutral-800" #bg></span>
        <span class="h-0 w-px bg-neutral-600" #border></span>
      </div>
      <div class="flex flex-1">
        <span class="h-full flex-1 bg-neutral-800" #bg></span>
        <span class="h-0 w-px bg-neutral-600" #border></span>
      </div>
      <div class="flex flex-1">
        <span class="h-full flex-1 bg-neutral-800" #bg></span>
        <span class="h-0 w-px bg-neutral-600" #border></span>
      </div>
    </div>
    <div class="flex flex-1">
      <span class="h-full flex-1 bg-neutral-800" #bg></span>
    </div>
  </div>`,
})
export class LoaderColsComponent {
  @ViewChild('container') private containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('line') private lineRef!: ElementRef<HTMLSpanElement>;
  @ViewChildren('bg') private bgRefs!: QueryList<ElementRef<HTMLSpanElement>>;
  @ViewChildren('border') private borderRefs!: QueryList<ElementRef<HTMLSpanElement>>;

  $lastUrl = signal<string>('');

  constructor(
    private router: Router,
    private store: AppStore,
  ) {
    afterNextRender(async () => {
      await this.leaveAnimation();
      this.$lastUrl.set(this.router.url);
      this.routerListener();
    });
  }

  private routerListener(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationStart)).subscribe(async (e) => {
      const lastBaseUrl = this.$lastUrl().split('#')[0];
      const nextBaseUrl = e.url.split('#')[0];

      if (lastBaseUrl !== nextBaseUrl) {
        this.store.setActiveSection('');
        await this.enterAnimation();
        await this.leaveAnimation();
      }

      this.$lastUrl.set(e.url);
    });
  }

  private async leaveAnimation(): Promise<void> {
    await Promise.all([
      animate(this.containerRef.nativeElement, { zIndex: -1 }, { ease: 'easeOut', delay: 0.8 })
        .finished,

      animate(this.lineRef.nativeElement, { top: '100%' }, { ease: 'easeInOut', duration: 0.8 })
        .finished,

      animate(
        this.borderRefs.map((el) => el.nativeElement),
        { height: '100%' },
        { ease: 'easeOut', duration: 0.2, delay: stagger(0.1, { startDelay: 0.8 }) },
      ).finished,

      animate(
        this.bgRefs.map((el) => el.nativeElement),
        { height: '0' },
        { ease: 'easeOut', duration: 0.2, delay: stagger(0.1) },
      ).finished,
    ]);
  }

  private async enterAnimation(): Promise<void> {
    await Promise.all([
      animate(this.containerRef.nativeElement, { zIndex: 8 }, { ease: 'easeOut' }).finished,

      animate(this.lineRef.nativeElement, { top: '-100%' }, { ease: 'easeInOut', duration: 0.8 })
        .finished,

      animate(
        this.borderRefs.map((el) => el.nativeElement),
        { height: '100%' },
        { ease: 'easeOut', duration: 0.2, delay: stagger(0.1) },
      ).finished,

      animate(
        this.bgRefs.map((el) => el.nativeElement),
        { height: '100%' },
        { ease: 'easeOut', duration: 0.2, delay: stagger(0.1) },
      ).finished,
    ]);
  }
}
