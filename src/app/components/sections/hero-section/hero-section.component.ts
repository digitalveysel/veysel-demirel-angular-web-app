import { Component } from '@angular/core';
import { TypingAnimationComponent } from '../../features/typing-animation/typing-animation.component';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';
import { MusicPlayerComponent } from '../../features/music-player/music-player.component';

@Component({
  selector: 'vd-hero-section',
  imports: [TypingAnimationComponent, ScrollSpyDirective, MusicPlayerComponent],
  template: `
    <section
      id="hero"
      aria-label="Hero Content"
      class="space-y-12 px-0 pt-12 lg:space-y-16 lg:py-16"
      vdScrollSpy
    >
      <div class="space-y-4 lg:px-16">
        <h1
          aria-label="Hello, I'm Veysel Demirel, as a Frontend Engineer and UI/UX Designer based in Türkiye."
          class="font-montserrat-alternates text-24px lg:text-48px font-normal xl:text-justify"
        >
          <span aria-hidden="true">
            hello, i’m
            <span
              class="light:from-orange-500 light:to-orange-500 bg-linear-to-r from-orange-600 to-orange-300 bg-clip-text font-extrabold text-transparent"
              >veysel demirel</span
            >, as a frontend engineer and ui/ux designer based in Türkiye.
          </span>
        </h1>
        <vd-typing-animation
          [vdSubject]="'I'"
          [vdVerbs]="['develop', 'design', 'create']"
          [vdPhrases]="[
            'impressive web applications',
            'creative web sites',
            'useful design systems',
          ]"
        />
      </div>
      <vd-music-player />
    </section>
  `,
})
export class HeroSectionComponent {}
