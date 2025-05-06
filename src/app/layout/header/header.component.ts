import { AfterViewInit, Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { LogoComponent } from '../../shared/components/ui/logo/logo.component';
import { IconComponent } from '../../shared/components/ui/icon/icon.component';
import { ThemeButtonComponent } from '../../shared/components/ui/theme-button/theme-button.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'vd-header',
  imports: [LogoComponent, IconComponent, ThemeButtonComponent],
  template: `<header
    class="sticky top-0 flex items-center justify-center gap-x-2 px-5  lg:gap-x-4 lg:px-10 z-8 {{
      isSticky() ? 'bg-neutral-800 py-3 lg:py-8' : 'bg-transparent py-5 lg:py-10'
    }}"
  >
    <vd-logo />
    <div class="flex flex-1 items-center justify-between lg:justify-end">
      <vd-theme-button />
      <button id="menuButton" class="flex items-center justify-center lg:hidden">
        <vd-icon name="menu" size="40" />
      </button>
    </div>
  </header>`,
})
export class HeaderComponent implements AfterViewInit {
  isSticky = signal<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    this.onWindowScroll();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isSticky.set(window.scrollY > 0);
    }
  }
}
