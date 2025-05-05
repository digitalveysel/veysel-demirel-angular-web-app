import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'vd-main-layout',
  imports: [RouterOutlet],
  template: `<div class="mx-auto max-w-7xl">
    <main class="w-full px-5 xl:px-64">
      <router-outlet />
    </main>
  </div>`,
})
export class MainLayoutComponent {}
