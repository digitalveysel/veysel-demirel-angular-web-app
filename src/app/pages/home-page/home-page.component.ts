import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../shared/components/sections/hero-section/hero-section.component';
import { ArticlesSectionComponent } from '../../shared/components/sections/articles-section/articles-section.component';
import { TechStackSectionComponent } from '../../shared/components/sections/tech-stack-section/tech-stack-section.component';
import { CoreSpecialitiesSectionComponent } from '../../shared/components/sections/core-specialities-section/core-specialities-section.component';
import { SkillHighlightsSectionComponent } from '../../shared/components/sections/skill-highlights-section/skill-highlights-section.component';

@Component({
  selector: 'vd-home-page',
  imports: [
    HeroSectionComponent,
    ArticlesSectionComponent,
    TechStackSectionComponent,
    CoreSpecialitiesSectionComponent,
    SkillHighlightsSectionComponent,
  ],
  template: `<vd-hero-section />
    <vd-articles-section />
    <vd-tech-stack-section />
    <vd-core-specialities-section />
    <vd-skill-highlights-section />`,
})
export class HomePageComponent {}
