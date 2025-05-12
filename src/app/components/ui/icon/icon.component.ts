import { Component, Input, OnInit, signal } from '@angular/core';
import { take } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService } from '../../../core/services/icon/icon.service';

@Component({
  selector: 'vd-icon',
  imports: [],
  template: `<div role="img" [innerHTML]="$svg()" [class]="vdClass"></div>`,
})
export class IconComponent implements OnInit {
  @Input() vdName = 'widgets';
  @Input() vdSize = '';
  @Input() vdClass = '';

  $svg = signal<SafeHtml>('');

  constructor(
    private iconService: IconService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.iconService
      .getSvg(this.vdName)
      .pipe(take(1))
      .subscribe((svgStr) => {
        if (this.vdSize) {
          svgStr = this.updateSvgDimensions(svgStr, this.vdSize);
        }

        this.$svg.set(this.sanitizer.bypassSecurityTrustHtml(svgStr));
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
