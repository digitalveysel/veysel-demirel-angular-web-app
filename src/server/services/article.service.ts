import Joi from 'joi';
import { Collection, DeleteResult, InsertOneResult, WithId } from 'mongodb';
import { Article, Section, Block } from '../models/article.model';
import Database from '../database';
import { Category } from '../models/category.model';

const categorySchema = Joi.object<Category>({
  id: Joi.string().required(),
  slug: Joi.string().required(),
  name: Joi.string().required(),
});

const blockSchema = Joi.object<Block>({
  id: Joi.string().required(),
  type: Joi.string().valid('title', 'paragraph', 'blockquote', 'list', 'image', 'code').required(),
  attributes: Joi.object().pattern(Joi.string(), Joi.string()).optional(),
  data: Joi.any().required(),
});

const sectionSchema = Joi.object<Section>({
  id: Joi.string().required(),
  blocks: Joi.array().items(blockSchema).min(1).required(),
});

const articleSchema = Joi.object<Article>({
  id: Joi.string().required(),
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  slug: Joi.string().required(),
  category: categorySchema.required(),
  sections: Joi.array().items(sectionSchema).min(1).required(),
  tags: Joi.array().items(Joi.string()).optional(),
});

class ArticleService {
  private collection: Collection<Article>;

  constructor() {
    const dInstance = Database.getInstance();
    this.collection = dInstance.getDb().collection('articles');
  }

  public async findAll(): Promise<Article[]> {
    return this.collection
      .find(
        {},
        {
          projection: {
            id: 1,
            title: 1,
            description: 1,
            slug: 1,
            category: 1,
            sections: 1,
            tags: 1,
          },
        },
      )
      .toArray();
  }

  public async findAllSummary(): Promise<Article[]> {
    return this.collection
      .find(
        {},
        {
          projection: {
            id: 1,
            title: 1,
            description: 1,
            slug: 1,
            category: 1,
          },
        },
      )
      .toArray();
  }

  public async findBySlug(payload: string): Promise<WithId<Article> | null> {
    return this.collection.findOne(
      { slug: payload },
      {
        projection: {
          id: 1,
          slug: 1,
          title: 1,
          description: 1,
          category: 1,
          sections: 1,
          tags: 1,
        },
      },
    );
  }

  public async create(payload: Article): Promise<InsertOneResult<Article>> {
    const { value, error } = articleSchema.validate(payload, { abortEarly: false });

    if (error) {
      const eMessages = error.details.map((detail) => detail.message);
      throw new Error(`[ArticleService] Validation failed: ${eMessages}`);
    }

    return this.collection.insertOne(value);
  }

  public async update(payload: Article): Promise<WithId<Article> | null> {
    const { value, error } = articleSchema.validate(payload, { abortEarly: false });

    if (error) {
      const eMessages = error.details.map((detail) => detail.message);
      throw new Error(`[ArticleService] Validation failed: ${eMessages}`);
    }

    return this.collection.findOneAndUpdate({ $set: value }, { returnDocument: 'after' });
  }

  public async delete(payload: string): Promise<DeleteResult> {
    return this.collection.deleteOne({ id: payload });
  }
}

export default ArticleService;
