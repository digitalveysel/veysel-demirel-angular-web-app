import { Router, Request, Response, NextFunction } from 'express';
import ArticleService from '../services/article.service';
import { Article } from '../models/article.model';

class ArticleController {
  public router = Router();
  private service = new ArticleService();

  constructor() {
    this.init();
  }

  private init(): void {
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/:id', this.getById.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.put('/:id', this.update.bind(this));
    this.router.delete('/:id', this.remove.bind(this));
  }

  private async getAll(_req: Request, res: Response<Article[]>, next: NextFunction): Promise<void> {
    try {
      const articles = await this.service.findAll();
      res.json(articles);
    } catch (error) {
      next(error);
    }
  }

  private async getById(
    req: Request<{ id: string }>,
    res: Response<Article>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const article = await this.service.findById(req.params.id);
      res.json(article as Article);
    } catch (error) {
      next(error);
    }
  }

  private async create(
    req: Request<Article>,
    res: Response<Article>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const created = await this.service.create(req.body as Article);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  private async update(
    req: Request<{ id: string }>,
    res: Response<Article>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const updated = await this.service.update(req.params.id, req.body);
      res.json(updated as Article);
    } catch (error) {
      next(error);
    }
  }

  private async remove(
    req: Request<{ id: string }>,
    res: Response<void>,
    next: NextFunction,
  ): Promise<void> {
    try {
      await this.service.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default ArticleController;
