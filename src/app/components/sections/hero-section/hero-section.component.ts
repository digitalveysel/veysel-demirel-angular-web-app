import { Component } from '@angular/core';
import { TypingAnimationComponent } from '../../features/typing-animation/typing-animation.component';

@Component({
  selector: 'vd-hero-section',
  imports: [TypingAnimationComponent],
  template: `
    <section id="hero" aria-label="Hero Content" class="space-y-4 px-0 py-12 lg:px-16 lg:py-16">
      <h1 class="font-montserrat-alternates text-24px lg:text-48px font-normal xl:text-justify">
        hello, i’m
        <span
          class="light:from-orange-500 light:to-orange-500 bg-linear-to-r from-orange-600 to-orange-300 bg-clip-text font-extrabold text-transparent"
          >veysel demirel</span
        >, as a front-end developer and ui/ux designer based in Türkiye.
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
