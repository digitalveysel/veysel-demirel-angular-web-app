import { afterNextRender, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { IconComponent } from '../../ui/icon/icon.component';
import { SoundService } from '../../../core/services/sound/sound.service';
import { animate } from 'motion';
import { AppStore } from '../../../core/store/app.store';
import { IMusicPlayerKeys } from '../../../core/models/keyboard.model';

@Component({
  selector: 'vd-music-player',
  imports: [IconComponent],
  template: `<div class="border border-neutral-600 bg-neutral-800 p-4 lg:p-8">
    <div class="flex flex-col gap-y-4">
      <div
        tabindex="0"
        role="progressbar"
        class="cursor-pointer-svg flex h-3 bg-neutral-700"
        aria-label="Progress Slider"
        aria-valuemin="0"
        (click)="onClickProgress($event)"
        (pointermove)="onPointerMoveProgress($event)"
        (pointerdown)="onPointerDownProgress()"
        (pointerup)="onPointerUpProgress()"
        (pointerleave)="onPointerUpProgress()"
        (keydown)="onKeyDownProgress($event)"
        #progress
      >
        <span
          class="light:bg-orange-600 pointer-events-none basis-px bg-orange-300"
          #progressFilled
        ></span>
      </div>
      <div class="flex items-end justify-between">
        <div class="flex gap-x-2">
          <button
            class="light:text-orange-600 size-10 text-orange-300"
            (click)="onClickPlayer()"
            [attr.aria-label]="isPlaying() ? 'Pause' : 'Play'"
          >
            @if (isPlaying()) {
              <vd-icon vdName="pause" vdSize="40" />
            } @else {
              <vd-icon vdName="play" vdSize="40" />
            }
          </button>
          <button
            class="light:text-orange-600 size-10 text-orange-300"
            (click)="onClickMuted()"
            [attr.aria-label]="store.isMuted() ? 'Unmute' : 'Mute'"
          >
            @if (store.isMuted()) {
              <vd-icon vdName="sound-off-square" vdSize="40" />
            } @else {
              <vd-icon vdName="sound-on-square" vdSize="40" />
            }
          </button>
        </div>
        <div
          class="text-16px lg:text-20px font-kumar-one flex gap-x-1 font-semibold text-neutral-300"
        >
          <span>{{ currentTime() }}</span
          >/<span>03:26</span>
        </div>
      </div>
    </div>
  </div>`,
})
export class MusicPlayerComponent {
  @ViewChild('progress') private progressRef!: ElementRef<HTMLDivElement>;
  @ViewChild('progressFilled') private progressFilledRef!: ElementRef<HTMLSpanElement>;

  isPlaying = signal<boolean>(false);
  isMouseDown = signal<boolean>(false);
  currentTime = signal<string>('00:00');
  audio!: HTMLAudioElement;
  private readonly name = 'valse';
  private onTimeUpdate = this.handleTimeUpdate.bind(this);
  private onEnded = this.handleEnded.bind(this);

  constructor(
    public store: AppStore,
    private soundService: SoundService,
  ) {
    afterNextRender(() => {
      this.audio = this.soundService.setCache(this.name);
      this.createListeners();
    });
  }

  private createListeners(): void {
    this.audio.addEventListener('timeupdate', this.onTimeUpdate);
    this.audio.addEventListener('ended', this.onEnded);
  }

  onClickPlayer(): void {
    const isCurrentlyPlaying = this.isPlaying();

    if (isCurrentlyPlaying) {
      this.pauseAudio();
    } else {
      this.playAudio();
    }

    this.toggleIsPlaying();
  }

  onClickMuted(): void {
    this.soundService.setIsMuted(!this.store.isMuted());
  }

  onClickProgress(event: MouseEvent): void {
    const el = this.progressRef.nativeElement;
    this.audio.currentTime = (event.offsetX / el.offsetWidth) * this.audio.duration;
  }

  onPointerMoveProgress(event: MouseEvent): void {
    if (this.isMouseDown()) {
      this.onClickProgress(event);
    }
  }

  onPointerDownProgress(): void {
    this.isMouseDown.set(true);
  }

  onPointerUpProgress(): void {
    this.isMouseDown.set(false);
  }

  onKeyDownProgress(event: KeyboardEvent): void {
    switch (event.key) {
      case IMusicPlayerKeys.SPACE:
        this.onClickPlayer();
        event.preventDefault();
        break;
      case IMusicPlayerKeys.ARROW_RIGHT:
        this.audio.currentTime = Math.min(this.audio.currentTime + 1, this.audio.duration);
        event.preventDefault();
        break;
      case IMusicPlayerKeys.ARROW_LEFT:
        this.audio.currentTime = Math.max(this.audio.currentTime - 1, 0);
        event.preventDefault();
        break;
    }
  }

  private pauseAudio(): void {
    this.soundService.pause(this.name);
    this.store.setIsRainy(false);
  }

  private playAudio(): void {
    this.soundService.play(this.name, true, false);
    this.store.setIsRainy(true);
  }

  private toggleIsPlaying(): void {
    this.isPlaying.set(!this.isPlaying());
  }

  private handleEnded(): void {
    this.audio.currentTime = 0.1;
    this.isPlaying.set(false);
    this.store.setIsRainy(false);
  }

  private handleTimeUpdate(): void {
    const el = this.progressFilledRef.nativeElement;
    const percent = (this.audio.currentTime / this.audio.duration) * 100;
    animate(el, { flexBasis: `${percent}%` });
    this.currentTime.set(this.formatTime(this.audio.currentTime));
  }

  private formatTime(currentTime: number): string {
    const minute = Math.floor(currentTime / 60)
      .toString()
      .padStart(2, '0');
    const second = Math.floor(currentTime % 60)
      .toString()
      .padStart(2, '0');
    return `${minute}:${second}`;
  }
}
