import { Component } from '@angular/core';

@Component({
  selector: 'vd-article-page',
  imports: [],
  template: `
    <article>
      <h1
        class="font-montserrat-alternates text-24px lg:text-48px light:from-orange-500 light:to-orange-500 bg-linear-to-r from-orange-600 to-orange-300 bg-clip-text px-0 py-6 font-bold text-transparent xl:px-6 xl:py-12"
      >
        Zoneless SSR in Angular
      </h1>
      <div class="mb-12 border border-neutral-600 bg-neutral-800 p-6 lg:mb-16">
        <p class="mb-6 text-neutral-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos consequuntur, ipsum,
          numquam voluptatum repudiandae quo vel quasi sit exercitationem,
          <a
            href="#"
            class="font-medium text-neutral-100 underline decoration-orange-500 decoration-2"
            >aliquam</a
          >
          ad aspernatur? Quibusdam quasi nihil necessitatibus distinctio. Possimus, blanditiis
          magni?
        </p>
        <p class="mb-6 text-neutral-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos consequuntur, ipsum,
          numquam voluptatum repudiandae quo vel quasi sit exercitationem,
          <a
            href="#"
            class="font-medium text-neutral-100 underline decoration-orange-500 decoration-2"
            >aliquam</a
          >
          ad aspernatur? Quibusdam quasi nihil necessitatibus distinctio. Possimus, blanditiis
          magni?
        </p>
        <p class="mb-6 text-neutral-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos consequuntur, ipsum,
          numquam voluptatum repudiandae quo vel quasi sit exercitationem,
          <a
            href="#"
            class="font-medium text-neutral-100 underline decoration-orange-500 decoration-2"
            >aliquam</a
          >
          ad aspernatur? Quibusdam quasi nihil necessitatibus distinctio. Possimus, blanditiis
          magni?
        </p>
        <blockquote
          class="text-14px mb-6 border-l-4 border-l-orange-400 pl-4 text-neutral-200 italic"
        >
          <p class="pb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, autem rerum dolorum
            blanditiis consequatur quaerat nesciunt? Consequatur magni, alias repudiandae
            exercitationem est porro modi reiciendis mollitia cumque itaque? Laboriosam, iste.
          </p>
          <cite class="font-montserrat-alternates">— Bill Gates</cite>
        </blockquote>
        <h2 class="text-24px font-montserrat-alternates mb-3 font-semibold">Lorem ipsum</h2>
        <p class="mb-6 text-neutral-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ab odit tempora adipisci.
          Veniam quisquam a voluptatum tempora voluptatem fuga dolorem expedita facere magnam.
          Provident ullam numquam labore eligendi reiciendis.
        </p>
      </div>
    </article>
  `,
})
export class ArticlePageComponent {}
