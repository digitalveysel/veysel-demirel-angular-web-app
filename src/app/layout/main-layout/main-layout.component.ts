import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'vd-main-layout',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  template: `<div class="mx-auto max-w-7xl">
    <vd-header />
    <div class="w-full px-5 xl:px-64">
      <main>
        <router-outlet />
        <vd-footer />
      </main>
    </div>
  </div>`,
})
export class MainLayoutComponent {}
