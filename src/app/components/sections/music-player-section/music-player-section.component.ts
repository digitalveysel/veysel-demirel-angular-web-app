import { Component } from '@angular/core';
import { MusicPlayerComponent } from '../../features/music-player/music-player.component';

@Component({
  selector: 'vd-music-player-section',
  imports: [MusicPlayerComponent],
  template: `<section
    id="musicPlayer"
    aria-label="Music Player Content"
    class="space-y-4 pb-12 lg:pb-16"
  >
    <vd-music-player />
  </section>`,
})
export class MusicPlayerSectionComponent {}
