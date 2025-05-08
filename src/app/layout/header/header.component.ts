import { AfterViewInit, Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { LogoComponent } from '../../shared/components/ui/logo/logo.component';
import { IconComponent } from '../../shared/components/ui/icon/icon.component';
import { ThemeButtonComponent } from '../../shared/components/ui/theme-button/theme-button.component';
import { isPlatformBrowser } from '@angular/common';
import { SoundButtonComponent } from '../../shared/components/ui/sound-button/sound-button.component';

@Component({
  selector: 'vd-header',
  imports: [LogoComponent, IconComponent, ThemeButtonComponent, SoundButtonComponent],
  template: `<header
    class="sticky top-0 flex items-center justify-center gap-x-2 z-8 xl:gap-x-4 px-5 py-3 xl:px-10 xl:py-5 {{
      isSticky() ? 'bg-neutral-800' : 'bg-transparent'
    }}"
  >
    <vd-logo />
    <div class="flex flex-1 items-center justify-between lg:justify-end">
      <vd-sound-button class="hidden lg:block" />
      <vd-theme-button />
      <button id="menuButton" class="flex items-center justify-center p-1 lg:hidden">
        <vd-icon name="menu" size="32" />
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
