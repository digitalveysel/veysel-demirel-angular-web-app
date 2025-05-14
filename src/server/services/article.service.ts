import Joi from 'joi';
import { Collection, ObjectId } from 'mongodb';
import { Article, Section, Block } from '../models/article.model';
import Database from '../database';

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
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
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
    const docs = await this.collection.find().toArray();
    return docs.map((d) => ({ ...d, id: d._id.toHexString() }));
  }

  public async findById(id: string): Promise<Article | null> {
    if (!ObjectId.isValid(id)) return null;
    const doc = await this.collection.findOne({ _id: new ObjectId(id) });
    return doc ? { ...doc, id: doc._id.toHexString() } : null;
  }

  public async create(payload: Article): Promise<Article> {
    const { value, error } = articleSchema.validate(payload, { abortEarly: false });
    if (error) throw new Error(error.details.map((d) => d.message).join('; '));

    const res = await this.collection.insertOne({
      ...value,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return {
      ...value,
      id: res.insertedId.toHexString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  public async update(id: string, payload: Article): Promise<Article | null> {
    if (!ObjectId.isValid(id)) return null;
    const { value, error } = articleSchema.validate(payload, { abortEarly: false });
    if (error) throw new Error(error.details.map((d) => d.message).join('; '));
    const updateDoc = { ...value, updatedAt: new Date() };
    const res = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateDoc },
      { returnDocument: 'after' },
    );
    if (!res?._id) return null;
    return { ...value, id };
  }

  public async delete(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) return false;
    const res = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount === 1;
  }
}

export default ArticleService;
