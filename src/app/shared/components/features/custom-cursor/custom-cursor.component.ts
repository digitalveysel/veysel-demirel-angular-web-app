import { DOCUMENT } from '@angular/common';
import { afterNextRender, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { animate, frame, motionValue } from 'motion';

@Component({
  selector: 'vd-custom-cursor',
  template: `
    <span
      class="bg-primary pointer-events-none fixed top-0 left-0 z-8 h-8 w-8 -translate-1/2 rounded-full pointer-coarse:hidden"
      #myCursor
    ></span>
  `,
})
export class CustomCursorComponent {
  @ViewChild('myCursor', { static: false }) private myCursor!: ElementRef<HTMLSpanElement>;

  private pointerX = motionValue(0);
  private pointerY = motionValue(0);

  constructor(@Inject(DOCUMENT) private document: Document) {
    afterNextRender(() => {
      this.animateInit();
    });
  }

  private animateInit(): void {
    const myCursorEl: HTMLSpanElement = this.myCursor.nativeElement;
    const { top, left, width, height } = myCursorEl.getBoundingClientRect();
    const initialX = left + width / 2;
    const initialY = top + height / 2;

    const springToPointer = () => {
      animate(
        myCursorEl,
        {
          x: this.pointerX.get() - initialX,
          y: this.pointerY.get() - initialY,
        },
        { type: 'spring', stiffness: 100, damping: 10 },
      );
    };

    const scheduleSpringToPointer = () => {
      frame.postRender(springToPointer);
    };

    this.pointerX.on('change', scheduleSpringToPointer);
    this.pointerY.on('change', scheduleSpringToPointer);

    animate(
      myCursorEl,
      {
        x: this.pointerX.get() - initialX,
        y: this.pointerY.get() - initialY,
      },
      { type: 'spring', stiffness: 100, damping: 10 },
    );

    this.document.addEventListener('pointermove', (e) => {
      this.pointerX.set(e.clientX);
      this.pointerY.set(e.clientY);
    });
  }
}
