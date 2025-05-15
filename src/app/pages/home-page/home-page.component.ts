import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/sections/hero-section/hero-section.component';
import { TechStackSectionComponent } from '../../components/sections/tech-stack-section/tech-stack-section.component';
import { CoreSpecialitiesSectionComponent } from '../../components/sections/core-specialities-section/core-specialities-section.component';
import { SkillHighlightsSectionComponent } from '../../components/sections/skill-highlights-section/skill-highlights-section.component';
import { MusicPlayerSectionComponent } from '../../components/sections/music-player-section/music-player-section.component';

@Component({
  selector: 'vd-home-page',
  imports: [
    HeroSectionComponent,
    TechStackSectionComponent,
    CoreSpecialitiesSectionComponent,
    SkillHighlightsSectionComponent,
    MusicPlayerSectionComponent,
  ],
  template: `<vd-hero-section />
    <vd-music-player-section />
    <vd-tech-stack-section />
    <vd-core-specialities-section />
    <vd-skill-highlights-section />`,
})
export class HomePageComponent {}
