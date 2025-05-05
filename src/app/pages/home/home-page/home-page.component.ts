import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../../shared/components/sections/hero-section/hero-section.component';
import { ArticlesSectionComponent } from '../../../shared/components/sections/articles-section/articles-section.component';
import { TechStackSectionComponent } from '../../../shared/components/sections/tect-stack-section/tech-stack-section.component';

@Component({
  selector: 'vd-home-page',
  imports: [HeroSectionComponent, ArticlesSectionComponent, TechStackSectionComponent],
  template: `<div class="mx-auto max-w-7xl">
    <main class="w-full px-5 xl:px-64">
      <vd-hero-section />
      <vd-articles-section />
      <vd-tech-stack-section />
    </main>
  </div>`,
})
export class HomePageComponent {}
