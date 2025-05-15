import { Router, Request, Response, NextFunction } from 'express';
import ArticleService from '../services/article.service';
import { Article } from '../models/article.model';
import { DeleteResult, InsertOneResult, WithId } from 'mongodb';
import { Routes } from '../models/routes.model';

class ArticleController {
  public router = Router();
  private service = new ArticleService();

  constructor() {
    this.init();
  }

  private init(): void {
    this.router.get('/', this.getAll.bind(this));
    this.router.get(`${Routes.ARTICLES_SUMMARY}`, this.getAllSummary.bind(this));
    this.router.get(`${Routes.ARTICLES_ID}`, this.getBySlug.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.put('/', this.update.bind(this));
    this.router.delete(`${Routes.ARTICLES_ID}`, this.remove.bind(this));
  }

  private async getAll(_req: Request, res: Response<Article[]>, next: NextFunction): Promise<void> {
    try {
      const result = await this.service.findAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  private async getAllSummary(
    _req: Request,
    res: Response<Article[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.service.findAllSummary();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  private async getBySlug(
    req: Request<{ id: string }>,
    res: Response<WithId<Article> | null>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.service.findBySlug(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  private async create(
    req: Request<Article>,
    res: Response<InsertOneResult<Article>>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.service.create(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  private async update(
    req: Request<{ article: Article }>,
    res: Response<WithId<Article> | null>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.service.update(req.params.article);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  private async remove(
    req: Request<{ id: string }>,
    res: Response<DeleteResult>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.service.delete(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default ArticleController;
