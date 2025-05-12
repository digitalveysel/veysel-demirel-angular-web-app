import { Component } from '@angular/core';
import { TypingAnimationComponent } from '../../features/typing-animation/typing-animation.component';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';

@Component({
  selector: 'vd-hero-section',
  imports: [TypingAnimationComponent, ScrollSpyDirective],
  template: `
    <section
      id="hero"
      aria-label="Hero Content"
      class="space-y-4 px-0 py-12 lg:px-16 lg:py-16"
      vdScrollSpy
    >
      <h1 class="font-montserrat-alternates text-24px lg:text-48px font-medium xl:text-justify">
        hello, i’m <span class="font-bold text-orange-500">veysel demirel</span>, as a front-end
        developer and ui/ux designer based in Türkiye.
      </h1>
      <vd-typing-animation
        [vdSubject]="'I'"
        [vdVerbs]="['develop', 'design', 'create']"
        [vdPhrases]="['impressive web applications', 'creative web sites', 'useful design systems']"
      />
    </section>
  `,
})
export class HeroSectionComponent {}
