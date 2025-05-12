import { Directive, HostListener, Input } from '@angular/core';
import { AppStore } from '../../core/store/app.store';

@Directive({
  selector: '[vdCursorLabel]',
})
export class CursorLabelDirective {
  @Input('vdCursorLabel') vdLabelText = '';

  constructor(private store: AppStore) {}

  @HostListener('mouseenter')
  onEnter(): void {
    this.store.setCursorLabel(this.vdLabelText);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.store.clearCursorLabel();
  }
}
