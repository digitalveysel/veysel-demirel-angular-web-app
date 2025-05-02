import { Component } from '@angular/core';
import { TypingAnimationComponent } from '../../features/typing-animation/typing-animation/typing-animation.component';

interface IPhrase {
  verb: string;
  desc: string;
}

@Component({
  selector: 'vd-hero-section',
  template: `
    <section id="hero" class="space-y-4 px-0 py-12 lg:px-16 lg:py-16">
      <h1 class="font-montserrat-alternates text-6 lg:text-12 font-medium xl:text-justify">
        hello, i’m <span class="font-bold text-orange-500">veysel demirel</span>, as a front-end
        developer and ux/ui designer based in Türkiye.
      </h1>
      <vd-typing-animation
        [subject]="'I'"
        [verbs]="['develop', 'design', 'create']"
        [phrases]="['impressive web applications', 'creative web sites', 'useful design systems']"
      />
    </section>
  `,
  imports: [TypingAnimationComponent],
})
export class HeroSectionComponent {
  private phrases: IPhrase[] = [
    { verb: 'develop ', desc: 'impressive web applications' },
    { verb: 'design ', desc: 'creative web sites' },
    { verb: 'create ', desc: 'useful design systems' },
  ];
}
