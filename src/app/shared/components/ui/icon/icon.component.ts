import { Component, Input, OnInit, signal } from '@angular/core';
import { IconService } from '../../../../core/services/icon/icon.service';
import { take } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'vd-icon',
  imports: [],
  template: `<div role="img" [innerHTML]="svg()" [class]="className"></div>`,
})
export class IconComponent implements OnInit {
  @Input() className = '';
  @Input() name = '';

  svg = signal<SafeHtml>('');

  constructor(private iconService: IconService) {}

  ngOnInit(): void {
    this.iconService
      .getSvg(this.name)
      .pipe(take(1))
      .subscribe((svg) => {
        this.svg.set(svg);
      });
  }
}
