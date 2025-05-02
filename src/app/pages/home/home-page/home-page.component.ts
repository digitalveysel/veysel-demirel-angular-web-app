import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../../shared/components/sections/hero-section/hero-section.component';

@Component({
  selector: 'vd-home-page',
  template: `<div class="mx-auto max-w-7xl">
    <main class="w-full px-5 xl:px-64">
      <vd-hero-section />
    </main>
  </div>`,
  imports: [HeroSectionComponent],
})
export class HomePageComponent {}
