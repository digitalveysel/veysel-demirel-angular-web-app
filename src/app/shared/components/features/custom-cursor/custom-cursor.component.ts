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
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { animate, frame, motionValue } from 'motion';

@Component({
  selector: 'vd-custom-cursor',
  template: `
    <span
      aria-hidden="true"
      class="pointer-events-none fixed top-0 left-0 z-50 h-8 w-8 -translate-1/2 rounded-full bg-orange-500 opacity-50 pointer-coarse:hidden"
      #cursorEl
    ></span>
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

  private addHoverListeners() {
    const linkElements = this.document.querySelectorAll('a, button');
    linkElements.forEach((el) => {
      el.addEventListener('mouseenter', () => this.onElementHover(true));
      el.addEventListener('mouseleave', () => this.onElementHover(false));
    });
  }

  private onElementHover(isHovering: boolean) {
    const el = this.cursorRef.nativeElement;

    if (isHovering) {
      animate(el, { opacity: '20%', scale: 2 });
    } else {
      animate(el, { opacity: '50%', scale: 1 });
    }
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
          { type: 'spring', stiffness: 100, damping: 10 },
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
