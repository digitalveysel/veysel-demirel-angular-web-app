import { Component, OnInit } from '@angular/core';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../../core/services/contact/contact.service';

@Component({
  selector: 'vd-contact-section',
  imports: [ScrollSpyDirective, ReactiveFormsModule],
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
      @let checkName = name?.invalid && (name?.dirty || name?.touched);
      @let checkEmail = email?.invalid && (email?.dirty || email?.touched);
      @let checkMessage = message?.invalid && (message?.dirty || message?.touched);
      <div class="relative flex">
        <label for="name" class="sr-only">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          formControlName="name"
          placeholder="Name"
          aria-required="true"
          [class]="commonClasses"
          [attr.aria-invalid]="checkName"
        />
        @if (checkName) {
          <small class="text-12px absolute right-0 bg-orange-100 px-2 py-1 text-orange-900"
            >Check this out!
          </small>
        }
      </div>
      <div class="relative flex">
        <label for="email" class="sr-only">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          formControlName="email"
          placeholder="Email"
          aria-required="true"
          [class]="commonClasses"
          [attr.aria-invalid]="checkEmail"
        />
        @if (checkEmail) {
          <small class="text-12px absolute right-0 bg-orange-100 px-2 py-1 text-orange-900"
            >Check this out!
          </small>
        }
      </div>
      <div class="relative flex">
        <label for="Message" class="sr-only">Message</label>
        <textarea
          id="message"
          name="message"
          formControlName="message"
          placeholder="Message"
          aria-required="true"
          rows="4"
          class="{{ commonClasses }} resize-none"
          [attr.aria-invalid]="checkMessage"
        ></textarea>
        @if (checkMessage) {
          <small class="text-12px absolute right-0 bg-orange-100 px-2 py-1 text-orange-900"
            >Check this out!
          </small>
        }
      </div>
      <input
        type="submit"
        class="w-fit border-2 border-neutral-600 px-4 py-3 text-neutral-400 hover:border-neutral-400 hover:text-neutral-200 focus:border-orange-500 focus:text-orange-500 focus:outline-none"
        value="Send message"
      />
    </form>
  </section>`,
})
export class ContactSectionComponent implements OnInit {
  commonClasses =
    'border-y-2 border-t-transparent border-b-neutral-600 py-3 placeholder:text-neutral-400 hover:border-b-neutral-400 hover:placeholder:text-neutral-200 focus:border-b-orange-500 focus:outline-none focus:placeholder:opacity-0 grow';
  cForm!: FormGroup;

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
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.cForm.invalid) {
      this.cForm.markAllAsTouched();
      return;
    }
  }
}
