import { Component } from '@angular/core';
import { ListComponent } from '../../components/ui/list/list.component';
import { TitleComponent } from '../../components/ui/title/title.component';
import { BlockquoteComponent } from '../../components/ui/blockquote/blockquote.component';
import { IArticle, IBlockTypes, IRunTypes } from '../../core/models/article.model';
import { AnimationDirective } from '../../directives/animation/animation.directive';

@Component({
  selector: 'vd-article-page',
  imports: [ListComponent, TitleComponent, BlockquoteComponent, AnimationDirective],
  template: `
    <article>
      <vd-title vdLevel="h1" [vdText]="article.title" />
      <div class="mb-12 space-y-9 border border-neutral-600 bg-neutral-800 p-6 lg:mb-16">
        @for (section of article.sections; track section.id) {
          <section class="space-y-6">
            @for (block of section.blocks; track block.id) {
              <div
                class="first:mb-0"
                [vdAnimation]="{
                  type: 'inView',
                  keyframes: {
                    opacity: [0, 1],
                  },
                  options: { duration: 1 },
                  callbackKeyframes: { opacity: 0 },
                }"
              >
                @switch (block.type) {
                  @case (blockTypes.TITLE) {
                    <vd-title [vdLevel]="block.data.level" [vdText]="block.data.text" />
                  }
                  @case (blockTypes.PARAGRAPH) {
                    <p class="text-neutral-200">
                      @for (run of block.data.runs; track run.id) {
                        @switch (run.type) {
                          @case (runTypes.TEXT) {
                            {{ run.text }}
                          }
                          @case (runTypes.LINK) {
                            <a
                              class="font-medium text-neutral-100 underline decoration-orange-500 decoration-2"
                              [href]="run.href"
                              [target]="run.target"
                              [rel]="run.rel"
                            >
                              {{ run.text }}
                            </a>
                          }
                        }
                      }
                    </p>
                  }
                  @case (blockTypes.BLOCKQUOTE) {
                    <vd-blockquote [vdText]="block.data.text" [vdCiteText]="block.data.citeText" />
                  }
                  @case (blockTypes.LIST) {
                    <vd-list
                      vdListClass="space-y-2"
                      vdListIcon="check-circle"
                      vdListIconClass="text-orange-400"
                      vdListIconSize="20"
                      vdListItemClass="flex gap-x-2 text-14px"
                      [vdList]="block.data.items"
                    />
                  }
                  @case (blockTypes.IMAGE) {
                    <img [src]="block.data.src" [alt]="block.data.alt" loading="lazy" />
                  }
                  @case (blockTypes.CODE) {
                    <code> {{ block.data.source }}</code>
                  }
                }
              </div>
            }
          </section>
        }
      </div>
    </article>
  `,
})
export class ArticlePageComponent {
  blockTypes = IBlockTypes;
  runTypes = IRunTypes;
  article: IArticle = {
    id: 'article-2025-angular-signals',
    title: 'Understanding Angular Signals and Reactivity in Angular 17',
    description:
      'Explore how Angular 17 introduces Signals, a new way to manage reactive state, improving performance and developer experience.',
    sections: [
      {
        id: 'section-intro',
        blocks: [
          {
            id: 'section-intro-01',
            type: 'paragraph',
            data: {
              runs: [
                {
                  id: 'section-intro-01-01',
                  type: 'text',
                  text: 'Angular 17 introduces Signals—a reactive primitive aimed at simplifying state management in Angular applications. This innovation allows developers to create reactive expressions without relying on complex change detection mechanisms.',
                },
              ],
            },
          },
          {
            id: 'section-intro-02',
            type: 'paragraph',
            data: {
              runs: [
                {
                  id: 'section-intro-02-01',
                  type: 'text',
                  text: 'In this article, we explore how Signals work and how you can integrate them into your Angular projects.',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'section-signals-intro',
        blocks: [
          {
            id: 'section-signals-intro-01',
            type: 'title',
            data: {
              level: 'h2',
              text: 'What Are Angular Signals?',
            },
          },
          {
            id: 'section-signals-intro-02',
            type: 'paragraph',
            data: {
              runs: [
                {
                  id: 'section-signals-intro-02-01',
                  type: 'text',
                  text: 'Signals are reactive variables that notify subscribers when their value changes. They offer fine-grained reactivity and work without relying on traditional change detection.',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'section-signals-core-concepts',
        blocks: [
          {
            id: 'section-signals-core-concepts-01',
            type: 'title',
            data: {
              level: 'h3',
              text: 'Core Concepts of Signals',
            },
          },
          {
            id: 'section-signals-core-concepts-02',
            type: 'list',
            data: {
              icon: 'check-circle',
              items: [
                { id: 'core-01', text: 'Signals are synchronous by default.' },
                { id: 'core-02', text: 'They automatically track dependencies.' },
                { id: 'core-03', text: 'They are ideal for performance-critical UIs.' },
              ],
            },
          },
        ],
      },
      {
        id: 'section-signals-usage',
        blocks: [
          {
            id: 'section-signals-usage-01',
            type: 'title',
            data: {
              level: 'h2',
              text: 'Using Signals in Components',
            },
          },
          {
            id: 'section-signals-usage-02',
            type: 'paragraph',
            data: {
              runs: [
                {
                  id: 'section-signals-usage-02-01',
                  type: 'text',
                  text: 'To use Signals, import the signal() function from @angular/core. You can define reactive values and bind them in templates using Angulars new syntax.',
                },
              ],
            },
          },
          {
            id: 'section-signals-usage-03',
            type: 'blockquote',
            data: {
              text: '“Signals represent a new era of reactivity in Angular. They simplify the mental model and enable high-performance UIs.”',
              citeText: 'Minko Gechev, Angular Team',
            },
          },
        ],
      },
      {
        id: 'section-signals-advanced',
        blocks: [
          {
            id: 'section-signals-advanced-01',
            type: 'title',
            data: {
              level: 'h3',
              text: 'Advanced Patterns with Signals',
            },
          },
          {
            id: 'section-signals-advanced-02',
            type: 'paragraph',
            data: {
              runs: [
                {
                  id: 'section-signals-advanced-02-01',
                  type: 'text',
                  text: 'You can combine Signals with effects and computed values. Effects run side effects when dependent signals change, and computed values provide derived state.',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'section-conclusion',
        blocks: [
          {
            id: 'section-conclusion-01',
            type: 'title',
            data: {
              level: 'h2',
              text: 'Conclusion',
            },
          },
          {
            id: 'section-conclusion-02',
            type: 'paragraph',
            data: {
              runs: [
                {
                  id: 'section-conclusion-02-01',
                  type: 'text',
                  text: 'Angular Signals bring a fresh and powerful approach to state management. They integrate cleanly with Angular templates and offer a more predictable and performant way to build applications.',
                },
              ],
            },
          },
        ],
      },
    ],
  };
}
