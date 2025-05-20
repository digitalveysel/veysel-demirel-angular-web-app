import { Component, computed, OnInit, signal } from '@angular/core';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../../core/services/contact/contact.service';
import { take } from 'rxjs';
import { IStatusKey, statusMessages } from '../../../core/models/status.model';
import { AnimationDirective } from '../../../directives/animation/animation.directive';

@Component({
  selector: 'vd-contact-section',
  imports: [ScrollSpyDirective, ReactiveFormsModule, AnimationDirective],
  template: `<section
    id="contact"
    aria-label="Contact Content"
    class="space-y-4 py-12 lg:py-16"
    vdScrollSpy
  >
    <h2 class="font-montserrat-alternates text-24px inline-block font-semibold xl:pl-4">Contact</h2>
    <form
      class="font-courier-prime flex flex-col gap-y-8 border border-neutral-600 bg-neutral-800 p-4 font-bold lg:p-8"
      autocomplete="off"
      [formGroup]="cForm"
      (ngSubmit)="onSubmit()"
    >
      <label for="name" class="sr-only">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        formControlName="name"
        placeholder="Name"
        aria-required="true"
        [class]="commonClasses"
        [attr.aria-invalid]="name?.invalid"
      />
      <label for="email" class="sr-only">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        formControlName="email"
        placeholder="Email"
        aria-required="true"
        [class]="commonClasses"
        [attr.aria-invalid]="email?.invalid"
      />
      <label for="Message" class="sr-only">Message</label>
      <textarea
        id="message"
        name="message"
        formControlName="message"
        placeholder="Message"
        aria-required="true"
        rows="4"
        class="{{ commonClasses }} resize-none"
        [attr.aria-invalid]="message?.invalid"
      ></textarea>
      <div class="relative isolate w-fit">
        <button
          type="submit"
          class="border-2 bg-neutral-800 px-4 py-3 text-neutral-400 select-none hover:border-neutral-400 hover:text-neutral-200 focus-visible:text-orange-500 focus-visible:outline-none active:border-orange-500 active:text-orange-500 {{
            $isLoading()
              ? 'border-transparent pointer-events-none'
              : 'border-neutral-600 focus-visible:border-orange-500'
          }}"
        >
          Send message
        </button>
        @if ($isLoading()) {
          <span
            aria-hidden="true"
            class="absolute -inset-0.5 -z-1 bg-conic-[from_var(--border-angle),var(--color-orange-300)_50%,var(--color-orange-600)]"
            [vdAnimation]="{
              keyframes: { '--border-angle': ['0deg', '360deg'] },
              options: { duration: 2, repeat: infinity, ease: 'linear' },
            }"
          ></span>
        }
      </div>
      @if ($message()) {
        <p
          class="text-12px relative bg-orange-100 px-2 py-1 text-orange-900 selection:bg-orange-500 after:absolute after:-top-2 after:-left-2 after:size-3 after:bg-orange-900"
        >
          {{ $message() }}
        </p>
      }
    </form>
  </section>`,
})
export class ContactSectionComponent implements OnInit {
  infinity = Infinity;
  commonClasses =
    'border-y-2 border-t-transparent border-b-neutral-600 py-3 placeholder:text-neutral-400 hover:border-b-neutral-400 hover:placeholder:text-neutral-200 focus:border-b-orange-500 focus:outline-none focus:placeholder:opacity-0 grow';
  cForm!: FormGroup;
  $isLoading = signal<boolean>(false);
  $status = signal<IStatusKey>('default');
  $message = computed<string | null>(() => statusMessages[this.$status()]);

  get name(): AbstractControl | null {
    return this.cForm.get('name');
  }

  get email(): AbstractControl | null {
    return this.cForm.get('email');
  }

  get message(): AbstractControl | null {
    return this.cForm.get('message');
  }

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
  ) {}

  ngOnInit(): void {
    this.onCreate();
  }

  onCreate(): void {
    this.cForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    this.$isLoading.set(true);
    this.$status.set('default');

    if (this.cForm.invalid) {
      this.$status.set('invalid');
      this.$isLoading.set(false);
      return;
    }

    this.contactService
      .send(this.cForm.value)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.$status.set('success');
          this.cForm.reset();
          this.$isLoading.set(false);
        },
        error: () => {
          this.$status.set('failure');
          this.$isLoading.set(false);
        },
      });
  }
}
