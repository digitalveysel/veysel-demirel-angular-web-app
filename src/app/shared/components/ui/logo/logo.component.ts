import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'vd-logo',
  imports: [RouterLink],
  template: `<a
    routerLink=""
    fragment="hero"
    id="logo"
    class="text-5 flex items-center gap-x-1 font-bold line-through"
    role="img"
    aria-label="Logo"
  >
    <span class="text-neutral-200">v</span>
    <span class="text-neutral-200">e</span>
    <span class="text-neutral-200">y</span>
    <span class="text-neutral-200">s</span>
    <span class="text-neutral-200">e</span>
    <span class="text-neutral-200">l</span>
    <span>d</span>
    <span>e</span>
    <span>m</span>
    <span>i</span>
    <span>r</span>
    <span>e</span>
    <span>l</span>
  </a>`,
})
export class LogoComponent {}
