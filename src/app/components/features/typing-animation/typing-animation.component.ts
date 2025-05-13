import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';

@Component({
  selector: 'vd-typing-animation',
  template: `
    <p class="text-16px md:text-24px font-semibold italic">
      <span>{{ vdSubject + ' ' }}</span>
      <span>{{ displayVerb() + ' ' }}</span>
      <span class="text-orange-500">{{ displayPhrase() }}</span>
    </p>
  `,
})
export class TypingAnimationComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) vdSubject!: string;
  @Input({ required: true }) vdVerbs!: string[];
  @Input({ required: true }) vdPhrases!: string[];

  @Input() vdTypingDelay = 100;
  @Input() vdPauseAfterWrite = 1000;
  @Input() vdPauseAfterErase = 500;

  private index = 0;
  private charIndex = 0;
  private direction: 1 | -1 = 1;
  private rafId: number | null = null;
  private nextUpdateTime = 0;
  private pauseUntil = 0;

  displayVerb = signal('');
  displayPhrase = signal('');

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.rafId = requestAnimationFrame(this.step.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.rafId != null && isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private step(time: number) {
    if (time < this.pauseUntil) {
      this.rafId = requestAnimationFrame(this.step.bind(this));
      return;
    }

    if (time >= this.nextUpdateTime) {
      const verb = this.vdVerbs[this.index];
      const phrase = this.vdPhrases[this.index];
      const fullText = `${verb} ${phrase}`;

      this.charIndex = Math.min(Math.max(this.charIndex + this.direction, 0), fullText.length);

      const split = verb.length;
      const current = fullText.slice(0, this.charIndex);

      if (this.charIndex <= split) {
        this.displayVerb.set(current);
        this.displayPhrase.set('');
      } else {
        this.displayVerb.set(current.slice(0, split));
        this.displayPhrase.set(current.slice(split + 1));
      }

      if (this.direction > 0 && this.charIndex === fullText.length) {
        this.direction = -1;
        this.pauseUntil = time + this.vdPauseAfterWrite;
      } else if (this.direction < 0 && this.charIndex === 0) {
        this.direction = 1;
        this.index = (this.index + 1) % this.vdVerbs.length;
        this.pauseUntil = time + this.vdPauseAfterErase;
      }

      this.nextUpdateTime = time + this.vdTypingDelay;
    }

    this.rafId = requestAnimationFrame(this.step.bind(this));
  }
}
