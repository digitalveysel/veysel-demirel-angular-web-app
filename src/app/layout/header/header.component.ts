import { AfterViewInit, Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { LogoComponent } from '../../components/ui/logo/logo.component';
import { ThemeButtonComponent } from '../../components/ui/theme-button/theme-button.component';
import { SoundButtonComponent } from '../../components/ui/sound-button/sound-button.component';
import { MenuButtonComponent } from '../../components/ui/menu-button/menu-button.component';
import { NavigationComponent } from '../../components/ui/navigation/navigation.component';
import { AppStore } from '../../core/store/app.store';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'vd-header',
  imports: [
    LogoComponent,
    ThemeButtonComponent,
    SoundButtonComponent,
    MenuButtonComponent,
    NavigationComponent,
  ],
  template: `<header
    class="sticky top-0 flex items-center justify-center gap-x-2 z-7 xl:gap-x-4 px-5 py-3 xl:px-10 xl:py-5 {{
      $isSticky() || store.isMenuOpen() ? 'bg-neutral-800' : 'bg-transparent'
    }}"
  >
    <vd-logo />
    <div class="flex flex-1 items-center justify-end lg:gap-x-10">
      <vd-navigation class="{{ store.isMenuOpen() ? 'block' : 'hidden' }} lg:block" />
      <ul class="flex flex-1 justify-between gap-x-2 lg:flex-none lg:justify-end">
        <li class="hidden lg:block">
          <vd-sound-button />
        </li>
        <li>
          <vd-theme-button />
        </li>
        <li class="block lg:hidden">
          <vd-menu-button />
        </li>
      </ul>
    </div>
  </header>`,
})
export class HeaderComponent implements AfterViewInit {
  $isSticky = signal<boolean>(false);

  constructor(
    public store: AppStore,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngAfterViewInit(): void {
    this.onWindowScroll();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.$isSticky.set(window.scrollY > 0);
    }
  }
}
