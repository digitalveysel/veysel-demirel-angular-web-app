import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../../shared/components/sections/hero-section/hero-section.component';
import { ArticlesSectionComponent } from '../../../shared/components/sections/articles-section/articles-section/articles-section.component';

@Component({
  selector: 'vd-home-page',
  imports: [HeroSectionComponent, ArticlesSectionComponent],
  template: `<div class="mx-auto max-w-7xl">
    <main class="w-full px-5 xl:px-64">
      <vd-hero-section />
      <vd-articles-section />
    </main>
  </div>`,
})
export class HomePageComponent {}
