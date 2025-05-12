import {
  Component,
  Inject,
  OnInit,
  AfterViewInit,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT, NgClass } from '@angular/common';
import { animate, frame, motionValue } from 'motion';
import { AppStore } from '../../../core/store/app.store';

@Component({
  selector: 'vd-custom-cursor',
  imports: [NgClass],
  template: `
    <span
      aria-hidden="true"
      [ngClass]="{
        'text-12px size-auto translate-1/4 rounded-none border border-orange-100 bg-orange-800 p-2 text-orange-100 opacity-100':
          store.cursorLabel(),
      }"
      class="pointer-events-none fixed top-0 left-0 z-9 size-10 -translate-1/2 rounded-full bg-orange-500 opacity-25 pointer-coarse:hidden"
      #cursorEl
      >{{ store.cursorLabel() }}</span
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCursorComponent implements OnInit, AfterViewInit {
  @ViewChild('cursorEl', { static: false }) private cursorRef!: ElementRef<HTMLSpanElement>;

  private pointerX = motionValue(0);
  private pointerY = motionValue(0);
  private pointerMoveHandler = this.onPointerMove.bind(this);
  private hasFinePointer = false;

  constructor(
    public store: AppStore,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const win = this.document.defaultView;
    this.hasFinePointer = !!win?.matchMedia('(pointer: fine)').matches;
  }

  ngAfterViewInit(): void {
    if (!this.hasFinePointer) return;
    this.initializeAnimation();
    this.document.addEventListener('pointermove', this.pointerMoveHandler);
    this.addHoverListeners();
  }

  private addHoverListeners(): void {
    const linkElements = this.document.querySelectorAll('a, button');
    linkElements.forEach((el) => {
      el.addEventListener('mouseenter', () => this.onElementHover(true));
      el.addEventListener('mouseleave', () => this.onElementHover(false));
    });
  }

  private onElementHover(isHovering: boolean): void {
    animate(this.cursorRef.nativeElement, {
      scale: isHovering ? 2 : 1,
    });
  }

  private initializeAnimation(): void {
    const el = this.cursorRef.nativeElement;
    const { left, top, width, height } = el.getBoundingClientRect();
    const originX = left + width / 2;
    const originY = top + height / 2;

    const scheduleSpring = () => {
      frame.postRender(() => {
        animate(
          el,
          { x: this.pointerX.get() - originX, y: this.pointerY.get() - originY },
          { type: 'spring', stiffness: 500, damping: 20 },
        );
      });
    };

    this.pointerX.on('change', scheduleSpring);
    this.pointerY.on('change', scheduleSpring);

    animate(
      el,
      { x: this.pointerX.get() - originX, y: this.pointerY.get() - originY },
      { type: 'spring', stiffness: 100, damping: 10 },
    );
  }

  private onPointerMove(e: PointerEvent): void {
    this.pointerX.set(e.clientX);
    this.pointerY.set(e.clientY);
  }
}
