import { afterNextRender, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { IconComponent } from '../../ui/icon/icon.component';
import { SoundService } from '../../../core/services/sound/sound.service';
import { animate } from 'motion';

@Component({
  selector: 'vd-music-player',
  imports: [IconComponent],
  template: `<div class="border border-neutral-600 bg-neutral-800 p-4 lg:p-8">
    <div class="flex flex-col gap-y-4" #audio>
      <button
        class="cursor-pointer-svg flex h-3 bg-neutral-700"
        (click)="onClickProgress($event)"
        #progress
      >
        <span
          class="light:bg-orange-600 pointer-events-none basis-px bg-orange-300"
          #progressFilled
        ></span>
      </button>
      <div class="flex" #controls>
        <button
          class="light:text-orange-600 size-10 text-orange-300"
          (click)="onClickPlayer()"
          #player
        >
          @if (isPlaying()) {
            <vd-icon vdName="pause" vdSize="40" />
          } @else {
            <vd-icon vdName="play" vdSize="40" />
          }
        </button>
      </div>
    </div>
  </div>`,
})
export class MusicPlayerComponent {
  @ViewChild('progress') private progressRef!: ElementRef<HTMLDivElement>;
  @ViewChild('progressFilled') private progressFilledRef!: ElementRef<HTMLSpanElement>;

  isPlaying = signal<boolean>(false);
  private readonly name = 'valse';
  private audio!: HTMLAudioElement;
  private onTimeUpdate = this.handleTimeUpdate.bind(this);
  private onEnded = this.handleEnded.bind(this);

  constructor(private soundService: SoundService) {
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
    if (this.isPlaying()) {
      this.soundService.pause(this.name);
    } else {
      this.soundService.play(this.name, false, false);
    }

    this.isPlaying.set(!this.isPlaying());
  }

  onClickProgress(event: MouseEvent): void {
    const el = this.progressRef.nativeElement;
    this.audio.currentTime = (event.offsetX / el.offsetWidth) * this.audio.duration;
  }

  private handleEnded(): void {
    this.audio.currentTime = 0.1;
    this.isPlaying.set(false);
  }

  private handleTimeUpdate(): void {
    const el = this.progressFilledRef.nativeElement;
    const percent = (this.audio.currentTime / this.audio.duration) * 100;
    animate(el, { flexBasis: `${percent}%` });
  }
}
