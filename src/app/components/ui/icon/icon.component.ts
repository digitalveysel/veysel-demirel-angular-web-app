import { Component, Input, OnInit, signal } from '@angular/core';
import { take } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService } from '../../../core/services/icon/icon.service';

@Component({
  selector: 'vd-icon',
  imports: [],
  template: `<div role="img" [innerHTML]="svg()" [class]="vdClass"></div>`,
})
export class IconComponent implements OnInit {
  @Input() name = 'widgets';
  @Input() size = '';
  @Input() vdClass = '';

  svg = signal<SafeHtml>('');

  constructor(
    private iconService: IconService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.iconService
      .getSvg(this.name)
      .pipe(take(1))
      .subscribe((svgStr) => {
        if (this.size) {
          svgStr = this.updateSvgDimensions(svgStr, this.size);
        }

        this.svg.set(this.sanitizer.bypassSecurityTrustHtml(svgStr));
      });
  }

  private updateSvgDimensions(svg: string, size: string): string {
    return svg.replace(/<svg[^>]*>/, (match) => {
      return match
        .replace(/width="[^"]*"/, `width="${size}"`)
        .replace(/height="[^"]*"/, `height="${size}"`);
    });
  }
}
