import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../components/ui/list/list.component';
import { TitleComponent } from '../../components/ui/title/title.component';
import { BlockquoteComponent } from '../../components/ui/blockquote/blockquote.component';
import { IArticle, IBlockTypes, IRunTypes } from '../../core/models/article.model';
import { AnimationDirective } from '../../directives/animation/animation.directive';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../core/services/article/article.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'vd-article-page',
  imports: [ListComponent, TitleComponent, BlockquoteComponent, AnimationDirective, AsyncPipe],
  template: `
    @let article = $article | async;
    @if (article) {
      <article>
        <vd-title vdLevel="h1" [vdText]="article.title" />
        <div class="mb-12 space-y-9 border border-neutral-600 bg-neutral-800 p-6 lg:mb-16">
          @for (section of article.sections; track section.id) {
            <section class="space-y-6">
              @for (block of section.blocks; track block.id) {
                <div
                  [class]="{ 'first:mb-0': block.type === blockTypes.TITLE }"
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
                      <vd-blockquote
                        [vdText]="block.data.text"
                        [vdCiteText]="block.data.citeText"
                      />
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
    }
  `,
})
export class ArticlePageComponent implements OnInit {
  blockTypes = IBlockTypes;
  runTypes = IRunTypes;
  $article!: Observable<IArticle>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.$article = this.articleService.getById(id);
  }
}
